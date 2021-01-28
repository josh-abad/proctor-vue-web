<template>
  <div>
    <div v-if="examCanStart && exam && attempt">
      <PageHeader hideMenu>{{ exam.label }}</PageHeader>
      <BasePanel class="mt-4">
        <BaseExamItem
          v-for="(item, i) in exam.examItems"
          :key="i"
          :exam-item="item"
          :question-number="i + 1"
          @answer-changed="handleAnswerChange"
        />
        <div class="mt-4 flex justify-between items-center">
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
      </BasePanel>
    </div>
    <Center v-else>
      <div class="flex flex-col items-center">
        <p class="font-thin text-2xl">
          Sorry, you are not allowed to take this exam.
        </p>
        <BaseButton
          class="mt-3"
          @click="$router.push(`/courses/${courseId}`)"
          prominent
          >Return to course</BaseButton
        >
      </div>
    </Center>
    <teleport to="#modals">
      <AppModal v-if="warningModalOpen" @close="warningModalOpen = false">
        <template #header> Warning </template>
        <template #body>
          Please refrain from leaving this page during the exam. You have
          {{ warningsLeft }}
          {{ warningsLeft === 1 ? "warning" : "warnings" }} left.
        </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import examResultsServices from '@/services/exam-results'
import { Answer, Attempt, Exam } from '@/types'
import Timer from '@/components/Timer.vue'
import { SET_ACTIVE_EXAM } from '@/store/mutation-types'
import { SUBMIT_EXAM } from '@/store/action-types'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import ModalButton from '@/components/ModalButton.vue'
import userMixin from '@/mixins/user'
import AppModal from '@/components/AppModal.vue'

export default defineComponent({
  name: 'ExamPage',
  components: { BaseExamItem, BaseButton, Timer, BasePanel, Center, PageHeader, ModalButton, AppModal },
  mixins: [userMixin],
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
      return this.$store.state.exams.activeExam
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
  created () {
    if (this.examCanStart) {
      window.addEventListener('beforeunload', this.promptBeforeLeaving)
      window.addEventListener('unload', this.handleUnload)
      window.addEventListener('blur', this.warn)
    }
  },
  mounted () {
    if (this.exam) {
      document.title = `${this.exam.label} in ${this.exam.course.name} | Proctor Vue`
      this.hasToken = examResultsServices.hasToken()
    }
  },
  unmount () {
    window.removeEventListener('beforeunload', this.promptBeforeLeaving)
    window.removeEventListener('unload', this.handleUnload)
    window.removeEventListener('blur', this.warn)
    if (this.activeExam) {
      this.handleSubmit()
    }
  },
  methods: {
    handleAnswerChange ({ question, answer }: Answer): void {
      // FIXME: duplicate questions don't get counted
      if (this.answers.some((a: Answer) => a.question === question)) {
        const index = this.answers.findIndex(a => a.question === question)
        this.answers[index] = { question, answer }
      } else {
        this.answers.push({ question, answer })
      }
    },
    async handleSubmit (): Promise<void> {
      await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
      this.$store.commit(SET_ACTIVE_EXAM, null)
      this.$router.replace(`/courses/${this.courseId}/exams/${this.examId}`)
    },
    promptBeforeLeaving (e: BeforeUnloadEvent): void {
      e.preventDefault()
      e.returnValue = ''
    },
    handleUnload () {
      localStorage.setItem('pendingSubmission', JSON.stringify({ answers: this.answers, examId: this.examId, submittedDate: new Date() }))
      this.$store.commit(SET_ACTIVE_EXAM, null)
      // await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
    },
    warn () {
      if (!this.warningsExceeded) {
        this.warnings++
        if (Notification.permission === 'granted') {
          const notification = new Notification('Return to exam')
          notification.addEventListener('click', () => {
            window.focus()
          })
        } else {
          Notification.requestPermission()
        }
        this.warningModalOpen = true
      }
    }
  }
})
</script>
