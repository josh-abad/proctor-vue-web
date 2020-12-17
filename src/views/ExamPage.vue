<template>
  <div class="mt-5" v-if="hasToken && activeExam === exam.id">
    <div class="bg-gray-800 px-3 py-2 rounded border dark:border-gray-700">
      <div class="text-xl">
        {{ exam.label }}
      </div>
      <div class="uppercase text-sm tracking-wide font-semibold dark:text-gray-500">
        {{ exam.course.name }}
      </div>
    </div>
    <BaseExamItem
      v-for="(item, i) in exam.questions"
      :key="item.id"
      :examItem="item"
      :questionNumber="i + 1"
      @answer-changed="handleAnswerChange"
    />
    <div class="mt-4 flex justify-end">
      <BaseButton label="Submit" @click="handleSubmit" />
    </div>
    <Timer :end="attempt.endDate" />
  </div>
  <div v-else>
    Sorry, you are not allowed to take this exam
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import examResultsServices from '@/services/exam_results'
import { Answer, Attempt, Exam } from '@/types'
import Timer from '@/components/Timer.vue'

/**
 * 1. User clicks on exam
 * 2. Browser sends a POST request to /api/exam-attempts with the user token, exam id, & date the exam finishes
 * 3. Server checks if user has reached max attempts
 *  3-a. User has not, server saves the attempt in DB as in-progress
 *  3-b. User has, user cannot continue. END
 * 4. Browser sends a PUT request to /api/exam-results to update attempt as ended when exam submitted/timer ends
 */

export default defineComponent({
  components: { BaseExamItem, BaseButton, Timer },
  name: 'ExamPage',
  data () {
    const answers: Answer[] = []
    return {
      answers,
      hasToken: false
    }
  },
  mounted () {
    document.title = this.exam.label
    this.hasToken = examResultsServices.hasToken()
  },
  computed: {
    exam (): Exam {
      const id: string | string[] = this.$route.params.examId
      return this.$store.getters.getExamByID(id)
    },
    attempt (): Attempt {
      const id: string | string[] = this.$route.params.attemptId
      return this.$store.getters.getAttemptByID(id)
    },
    activeExam (): string | null {
      return this.$store.state.activeExam
    }
  },
  methods: {
    handleAnswerChange ({ questionId, answer }: Answer): void {
      if (this.answers.some((a: Answer) => a.questionId === questionId)) {
        const index = this.answers.findIndex(a => a.questionId === questionId)
        this.answers[index] = { questionId, answer }
      } else {
        this.answers.push({ questionId, answer })
      }
    },
    async handleSubmit (): Promise<void> {
      await this.$store.dispatch('submitExam', { answers: this.answers, examId: this.exam.id })
      this.$router.push(`/exams/${this.exam.id}/attempts`)
    }
  }
})
</script>
