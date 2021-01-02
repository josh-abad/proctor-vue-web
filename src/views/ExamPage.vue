<template>
  <div>
    <div
      v-if="
        $store.getters.permissions('coordinator', 'admin') ||
        (hasToken && activeExam === exam.id)
      "
    >
      <ColorHeader>{{ exam.label }}</ColorHeader>
      <BasePanel class="mt-4">
        <BaseExamItem
          v-for="(item, i) in exam.examItems"
          :key="i"
          :examItem="item"
          :questionNumber="i + 1"
          @answer-changed="handleAnswerChange"
        />
        <div class="mt-4 flex justify-between items-center">
          <Timer :end="attempt.endDate" @timer-ended="handleTimeEnd" />
          <BaseButton @click="handleSubmit" prominent>Submit</BaseButton>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import examResultsServices from '@/services/exam-results'
import { Answer, Attempt, Exam } from '@/types'
import Timer from '@/components/Timer.vue'
import { DISPLAY_DIALOG, SET_ACTIVE_EXAM } from '@/store/mutation-types'
import { SUBMIT_EXAM } from '@/store/action-types'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import ColorHeader from '@/components/ColorHeader.vue'

export default defineComponent({
  components: { BaseExamItem, BaseButton, Timer, BasePanel, Center, ColorHeader },
  name: 'ExamPage',
  data () {
    const answers: Answer[] = []
    return {
      answers,
      hasToken: false
    }
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
  mounted () {
    document.title = `${this.exam.label} in ${this.exam.course.name} | Proctor Vue`
    this.hasToken = examResultsServices.hasToken()
  },
  computed: {
    exam (): Exam {
      return this.$store.getters.getExamByID(this.examId)
    },
    attempt (): Attempt {
      return this.$store.getters.getAttemptByID(this.attemptId)
    },
    activeExam (): string | null {
      return this.$store.state.activeExam
    }
  },
  methods: {
    handleAnswerChange ({ question, answer }: Answer): void {
      if (this.answers.some((a: Answer) => a.question === question)) {
        const index = this.answers.findIndex(a => a.question === question)
        this.answers[index] = { question, answer }
      } else {
        this.answers.push({ question, answer })
      }
    },
    async handleTimeEnd (): Promise<void> {
      await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
      this.$store.commit(SET_ACTIVE_EXAM, null)
      this.$router.push(`/courses/${this.courseId}/exams/${this.examId}`)
    },
    handleSubmit (): void {
      this.$store.commit(DISPLAY_DIALOG, {
        header: 'Submit Answers',
        actionLabel: 'Submit',
        message: 'Are you sure you want to submit your answers?'
      })

      this.$emitter.on('closedDialog', async (confirm: boolean) => {
        if (confirm) {
          await this.$store.dispatch(SUBMIT_EXAM, { answers: this.answers, examId: this.examId })
          this.$store.commit(SET_ACTIVE_EXAM, null)
          this.$router.push(`/courses/${this.courseId}/exams/${this.examId}`)
        }
        this.$emitter.all.clear()
      })
    }
  }
})
</script>
