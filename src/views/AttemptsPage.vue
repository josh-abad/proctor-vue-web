<template>
  <div class="mx-4 my-6">
    <div>
      <div
        class="dark:bg-gray-800 px-4 py-4 rounded-lg border dark:border-gray-700"
      >
        <router-link :to="`/courses/${exam.course.id}`" class="text-3xl font-thin">
          {{ exam.course.name }}
        </router-link>
      </div>
      <div
        class="dark:bg-gray-800 px-4 py-4 mt-4 rounded-lg border dark:border-gray-700"
      >
        <div class="text-xl">
          {{ exam.label }}
        </div>
        <div class="mt-2 dark:text-gray-400 text-md">
          <div>
            You have
            {{ attemptsLeft }}
            attempts left
          </div>
          <div v-show="attemptsLeft > 0">Time limit is {{ secondsToHMS(exam.duration) }}</div>
        </div>
        <div v-if="attempts.length > 0" class="mt-4">
          <h1 class="text-sm font-semibold uppercase tracking-wide">Previous Attempts</h1>
          <div
            class="rounded-xl overflow-hidden mt-2 dark:bg-gray-800 border dark:border-gray-700 shadow-lg"
          >
            <div v-for="(attempt, i) in attempts" :key="attempt.id">
              <AttemptRow :attemptNumber="i + 1" :attempt="attempt" />
            </div>
          </div>
        </div>
        <div v-else>You have made no attempts so far</div>
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <BaseButton
        v-show="attemptsLeft > 0"
        :label="attempts.length > 0 ? 'Re-attempt quiz' : 'Attempt quiz'"
        :disabled="attempts.length === exam.maxAttempts"
        @click="startAttempt"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AttemptRow from '@/components/AttemptRow.vue'
import BaseButton from '@/components/BaseButton.vue'
import examAttemptsService from '@/services/exam_attempts'
import examResultsService from '@/services/exam_results'
import { Attempt, Exam } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, AttemptRow },
  name: 'AttemptsPage',
  computed: {
    exam (): Exam {
      return this.$store.getters.getExamByID(this.$route.params.id)
    },
    attempts (): Attempt[] {
      const examId = this.$route.params.id
      return this.$store.getters.getAttemptsByExam(examId)
    },
    attemptsLeft (): number {
      return this.exam.maxAttempts - this.attempts.length
    }
  },
  methods: {
    secondsToHMS (d: number) {
      d = Number(d)
      const h = Math.floor(d / 3600)
      const m = Math.floor((d % 3600) / 60)
      const s = Math.floor((d % 3600) % 60)

      const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : ''
      const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : ''
      const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
      return hDisplay + mDisplay + sDisplay
    },
    async startAttempt () {
      try {
        const response = await examAttemptsService.start(this.exam.id)
        this.$store.commit('addAttempt', response.attempt)
        window.localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        this.$store.commit('setActiveExam', response.attempt.exam)
        this.$router.push(
          `/exams/${this.exam.id}/attempts/${response.attempt.id}`
        )
      } catch (error) {
        this.$store.dispatch('alert', 'Attempt could not be started')
      }
    }
  }
})
</script>
