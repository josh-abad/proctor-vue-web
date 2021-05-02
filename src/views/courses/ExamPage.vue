<template>
  <div class="p-4">
    <teleport to="#modals">
      <div
        class="fixed bottom-0 right-0 z-20 flex px-4 py-2 mr-8 space-x-2 bg-gray-700 bg-opacity-75 rounded-t-lg shadow-lg backdrop-filter backdrop-blur"
      >
        <Webcam
          @no-face-seen="handleNoFaceSeen"
          @unidentified-face="handleUnidentifiedFace"
          hide-video
        />
        <div class="flex items-center">
          <ExclamationIcon
            class="w-10 h-10 text-gray-500 stroke-current"
            :class="{
              'text-white': !warningsExceeded && warnings > 0,
              'text-red-500': warningsExceeded,
            }"
          />
          <span class="text-3xl">{{ warnings }}</span>
        </div>
      </div>
    </teleport>
    <div v-if="examCanStart && exam && attempt">
      <PageHeader hide-menu>
        <template #label>{{ exam.label }}</template>
      </PageHeader>
      <AppPanel class="mt-4">
        <BaseExamItem
          v-for="(item, i) in exam.examItems"
          :key="i"
          :exam-item="item"
          :question-number="i + 1"
          @answer-changed="handleAnswerChange"
        />
        <div class="flex items-center justify-between mt-4">
          <Timer :end="attempt.endDate" @timer-ended="handleSubmit" />
          <ModalButton
            header="Submit Answers"
            message="Are you sure you want to submit your answers?"
            action-label="Submit"
            @confirm="handleSubmit"
            prominent
            >Submit</ModalButton
          >
        </div>
      </AppPanel>
    </div>
    <Center v-else>
      <div class="flex flex-col items-center">
        <p class="text-2xl font-thin">
          Sorry, you are not allowed to take this exam.
        </p>
        <AppButton
          class="mt-3"
          @click="$router.push(`/courses/${courseId}`)"
          prominent
          >Return to course</AppButton
        >
      </div>
    </Center>
    <teleport to="#modals">
      <AppModal :open="warningModalOpen" @close="warningModalOpen = false">
        <template #header> Warning </template>
        <template #body>
          Please refrain from leaving this page during the exam. You have
          {{ warningsLeft }}
          {{ warningsLeft === 1 ? "warning" : "warnings" }} left.
        </template>
      </AppModal>
    </teleport>
    <KeepOnPage
      v-if="examCanStart"
      :prevent-leave="!submitted"
      @leave-attempt="handleLeaveAttempt"
      @leave-focus="warn"
      @leave-timeout="warn"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import examResultsServices from '@/services/exam-results'
import { Answer, Attempt, Exam } from '@/types'
import Timer from '@/components/Timer.vue'
import { SET_ACTIVE_EXAM } from '@/store/mutation-types'
import { ALERT, SUBMIT_EXAM } from '@/store/action-types'
import AppPanel from '@/components/ui/AppPanel.vue'
import Center from '@/components/Center.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import KeepOnPage from '@/components/KeepOnPage.vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'ExamPage',
  components: {
    BaseExamItem,
    AppButton,
    Timer,
    AppPanel,
    Center,
    PageHeader,
    ModalButton,
    AppModal,
    Webcam,
    KeepOnPage,
    ExclamationIcon
  },
  props: {
    courseId: {
      type: String,
      required: true
    },
    examId: {
      type: String,
      required: true
    },
    attemptId: {
      type: String,
      required: true
    }
  },
  data () {
    const answers: Answer[] = []
    return {
      answers,
      hasToken: false,
      submitted: false,
      warnings: 0,
      maxWarnings: 5,
      warningModalOpen: false
    }
  },
  computed: {
    examCanStart (): boolean {
      return !!this.exam && !!this.attempt && this.hasToken && (this.activeExam === this.exam.id)
    },
    exam (): Exam | undefined {
      return this.$store.getters.examByID(this.examId)
    },
    attempt (): Attempt | undefined {
      return this.$store.getters.attemptByID(this.attemptId)
    },
    activeExam (): string | null {
      return this.$store.state.activeExam
    },
    warningsExceeded (): boolean {
      return this.warnings === this.maxWarnings
    },
    warningsLeft (): number {
      return this.maxWarnings - this.warnings
    }
  },
  watch: {
    warningsExceeded (exceeded: boolean) {
      if (exceeded) {
        this.handleSubmit()
      }
    }
  },
  mounted () {
    if (this.exam) {
      document.title = `${this.exam.label} in ${this.exam.course.name} | Proctor Vue`
      this.hasToken = examResultsServices.hasToken()
    }
  },
  unmount () {
    if (this.activeExam) {
      this.handleSubmit()
    }
  },
  methods: {
    handleNoFaceSeen () {
      this.warnings++
      this.$store.dispatch(ALERT, 'No face seen for 10 seconds.')
    },
    handleUnidentifiedFace () {
      this.warnings++
      this.$store.dispatch(ALERT, 'Face unidentified for 10 seconds')
    },
    handleAnswerChange ({ question, answer }: Answer) {
      // FIXME: duplicate questions don't get counted
      if (this.answers.some((a: Answer) => a.question === question)) {
        const index = this.answers.findIndex(a => a.question === question)
        this.answers[index] = { question, answer }
      } else {
        this.answers.push({ question, answer })
      }
    },
    handleLeaveAttempt () {
      this.$store.dispatch(ALERT, `You cannot leave until you have ${this.maxWarnings} warnings`)
    },
    async handleSubmit () {
      this.submitted = true
      await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
      this.$store.commit(SET_ACTIVE_EXAM, null)
      this.$router.replace(`/courses/${this.courseId}/exams/${this.examId}`)
    },
    handleUnload () {
      localStorage.setItem('pendingSubmission', JSON.stringify({ answers: this.answers, examId: this.examId, submittedDate: new Date() }))
      this.$store.commit(SET_ACTIVE_EXAM, null)
      // await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
    },
    warn () {
      if (!this.warningsExceeded) {
        this.warnings++
        // if (Notification.permission === 'granted') {
        //   const notification = new Notification('Return to exam')
        //   notification.addEventListener('click', () => {
        //     window.focus()
        //   })
        // } else {
        //   Notification.requestPermission()
        // }
        this.warningModalOpen = true
      }
    }
  }
})
</script>
