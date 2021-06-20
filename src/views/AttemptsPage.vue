<template>
  <div>
    <transition name="fade" mode="out-in">
      <EmptyState v-if="!$store.state.user?.referenceImageUrl">
        <template #icon><UserIcon class="w-12 h-12" /></template>
        <template #content>
          Please set up Face Identification to proceed with the exam.
        </template>
      </EmptyState>
      <div v-else-if="hasError" class="mt-2">
        <ErrorLoading />
      </div>
      <SkeletonAttemptsList v-else-if="isLoading" />
      <div v-else-if="attempts.length > 0">
        <AppLabel emphasis>Previous Attempts</AppLabel>
        <List class="mt-2">
          <AttemptItem
            v-for="(attempt, i) in attempts"
            :key="attempt.id"
            :attempt-number="i + 1"
            :attempt="attempt"
            @delete="handleDelete"
          />
        </List>
      </div>
      <EmptyState v-else>
        <template #icon><DocumentDuplicateIcon class="w-12 h-12" /></template>
        <template #content>You don't have any attempts for this quiz.</template>
      </EmptyState>
    </transition>
    <div class="flex justify-center mt-4">
      <AppButton
        @click="$router.push('/settings/face-id')"
        v-if="!$store.state.user?.referenceImageUrl"
        prominent
      >
        Set up Face ID
      </AppButton>
      <AppButton
        v-else-if="
          locked === 0 &&
          attemptsLeft > 0 &&
          $store.state.user?.referenceImageUrl
        "
        id="btn-open"
        @click="$emit('update:starting', true)"
        prominent
      >
        {{ attempts.length > 0 ? 'Re-attempt quiz' : 'Attempt quiz' }}
      </AppButton>
      <AppButton
        v-if="locked !== 0 || attemptsLeft === 0"
        @click="$router.push(`/courses/${courseSlug}`)"
        prominent
      >
        Back to the Course
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import AttemptItem from '@/components/AttemptItem.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import { computed, defineComponent } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import AppButton from '@/components/ui/AppButton.vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import { DocumentDuplicateIcon, UserIcon } from '@heroicons/vue/outline'
import { isExamLocked } from '@/utils/helper'
import useFetch from '@/composables/use-fetch'
import userService from '@/services/user'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import SkeletonAttemptsList from '@/components/SkeletonAttemptsList.vue'
import List from '@/components/List.vue'
import coursesService from '@/services/courses'
import EmptyState from '@/components/EmptyState.vue'

dayjs.extend(relativeTime)
dayjs.extend(duration)

export default defineComponent({
  name: 'AttemptsPage',
  components: {
    AttemptItem,
    AppLabel,
    AppButton,
    DocumentDuplicateIcon,
    UserIcon,
    ErrorLoading,
    SkeletonAttemptsList,
    List,
    EmptyState
  },
  props: {
    courseSlug: {
      type: String,
      required: true
    },

    examSlug: {
      type: String,
      required: true
    },

    starting: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:starting'],
  setup(props) {
    const [exam, fetchExam, isLoadingExam, hasErrorExam] = useFetch(() =>
      coursesService.getExam(props.courseSlug, props.examSlug)
    )

    const [attempts, fetchAttempts, isLoadingAttempts, hasErrorAttempts] =
      useFetch(() => userService.getAttemptsByExam(exam.value.id), [])

    const isLoading = computed(() => {
      return isLoadingExam.value || isLoadingAttempts.value
    })

    const hasError = computed(() => {
      return hasErrorExam.value || hasErrorAttempts.value
    })

    fetchExam().then(() => {
      fetchAttempts()
    })

    return {
      exam,
      attempts,
      isLoading,
      hasError
    }
  },
  computed: {
    locked(): number {
      return this.exam ? isExamLocked(this.exam) : 0
    },
    attemptsLeft(): number {
      return this.exam ? this.exam.maxAttempts - this.attempts.length : 0
    },
    displayAttemptsLeft(): string {
      return `You have ${this.attemptsLeft} ${
        this.attemptsLeft === 1 ? 'attempt' : 'attempts'
      } left.`
    },
    highestGrade(): number {
      return this.attempts.reduce((a, b) => Math.max(a, b.score), 0)
    }
  },
  methods: {
    handleDelete(id: string) {
      this.attempts = this.attempts.filter(attempt => attempt.id !== id)
    }
  }
})
</script>
