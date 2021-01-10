<template>
  <div>
    <div>
      <ColorHeader :links="links" hideMenu>{{ exam.label }}</ColorHeader>
      <BasePanel class="mt-4">
        <div class="dark:text-gray-400">
          <div v-if="highestGrade">
            Your highest score for this quiz is {{ highestGrade }}.
          </div>
          <div>
            {{ displayAttemptsLeft }}
          </div>
          <div v-show="attemptsLeft > 0">The quiz will end {{ duration }}.</div>
        </div>
        <div v-if="attempts.length > 0" class="mt-4">
          <BaseLabel emphasis>Previous Attempts</BaseLabel>
          <div
            class="rounded-xl overflow-hidden mt-2 divide-y divide-gray-300 dark:divide-gray-700"
          >
            <AttemptRow
              v-for="(attempt, i) in attempts"
              :key="attempt.id"
              :attempt-number="i + 1"
              :attempt="attempt"
              @review-clicked="
                $router.push(
                  `/courses/${courseId}/exams/${examId}/${attempt.id}`
                )
              "
            />
          </div>
        </div>
        <div v-else>You have made no attempts so far.</div>
        <div class="mt-4 flex flex-row-reverse justify-between">
          <BaseButton
            v-show="attemptsLeft > 0"
            :disabled="attempts.length === exam.maxAttempts"
            @click="startAttempt"
            prominent
          >
            {{ attempts.length > 0 ? "Re-attempt quiz" : "Attempt quiz" }}
          </BaseButton>
          <BaseButton
            v-show="$store.getters.permissions('coordinator', 'admin')"
            @click="deleteExam"
          >
            Delete exam
          </BaseButton>
        </div>
      </BasePanel>
    </div>
  </div>
</template>

<script lang="ts">
import AttemptRow from '@/components/AttemptRow.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import ColorHeader from '@/components/ColorHeader.vue'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import { ALERT, DELETE_EXAM } from '@/store/action-types'
import {
  ADD_ATTEMPT,
  DISPLAY_DIALOG,
  SET_ACTIVE_EXAM
} from '@/store/mutation-types'
import { Attempt, DialogContent, Exam, Link } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export default defineComponent({
  name: 'AttemptsPage',
  components: { BaseButton, AttemptRow, BasePanel, BaseLabel, ColorHeader },
  props: {
    courseId: {
      type: String,
      required: true
    },
    examId: {
      type: String,
      required: true
    }
  },
  computed: {
    links (): Link[] {
      return [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Courses',
          url: '/courses'
        },
        {
          name: this.exam.course.name,
          url: `/courses/${this.courseId}`
        },
        {
          name: this.exam.label,
          url: `/courses/${this.courseId}/exams/${this.examId}`
        }
      ]
    },
    exam (): Exam {
      return this.$store.getters.getExamByID(this.examId)
    },
    attempts (): Attempt[] {
      return this.$store.getters.getAttemptsByExam(this.examId)
    },
    attemptsLeft (): number {
      return this.exam.maxAttempts - this.attempts.length
    },
    displayAttemptsLeft (): string {
      return `You have ${this.attemptsLeft} ${this.attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`
    },
    highestGrade (): number {
      return this.attempts.reduce((a, b) => Math.max(a, b.score), 0)
    },
    duration (): string {
      return dayjs.duration({ seconds: this.exam.duration }).humanize(true)
    }
  },
  methods: {
    startAttempt () {
      this.$store.commit(DISPLAY_DIALOG, {
        header: 'Attempt Quiz',
        actionLabel: 'Start Quiz',
        message: 'Are you sure you want to start the quiz?'
      })

      this.$emitter.on('closedDialog', async (confirm: boolean) => {
        if (confirm) {
          try {
            const response = await examAttemptsService.start(this.examId)
            this.$store.commit(ADD_ATTEMPT, response.attempt)
            window.localStorage.setItem('activeExam', JSON.stringify(response))
            examResultsService.setToken(response.token)
            this.$store.commit(SET_ACTIVE_EXAM, response.attempt.exam)
            this.$router.push(
              `/courses/${this.courseId}/exams/${this.examId}/${response.attempt.id}`
            )
          } catch (error) {
            this.$store.dispatch(ALERT, 'Attempt could not be started')
          }
        }
        this.$emitter.all.clear()
      })
    },
    async deleteExam (): Promise<void> {
      const dialogContent: Omit<DialogContent, 'closed'> = {
        header: 'Delete Exam',
        message: 'Are you sure you want to delete this exam?',
        actionLabel: 'Delete'
      }
      this.$store.commit(DISPLAY_DIALOG, dialogContent)

      this.$emitter.on('closedDialog', (confirmDelete: boolean) => {
        if (confirmDelete) {
          this.$store.dispatch(DELETE_EXAM, this.examId)
          this.$router.push(`/courses/${this.courseId}`)
        }
        this.$emitter.all.clear()
      })
    }
  }
})
</script>
