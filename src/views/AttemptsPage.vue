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
        @click="openStartingModal"
        prominent
      >
        {{ attempts.length > 0 ? 'Re-attempt quiz' : 'Attempt quiz' }}
      </AppButton>
      <teleport to="#modals">
        <AppModal
          v-model="startingModal"
          class="w-96"
          @close="$emit('update:starting', false)"
        >
          <template #header>{{ exam?.label }}</template>
          <template #body>
            <p>Are your sure your want to attempt this quiz?</p>
            <ul class="mt-4 space-y-2">
              <AttemptChecklistItem
                :loading="cameraStatus === 'loading'"
                :enabled="cameraStatus === 'enabled'"
              >
                Webcam enabled
              </AttemptChecklistItem>
            </ul>
          </template>
          <template #action>
            <AppButton
              @click="startAttempt"
              prominent
              :disabled="cameraStatus !== 'enabled'"
            >
              Start Quiz
            </AppButton>
          </template>
        </AppModal>
      </teleport>
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
import examAttemptsService from '@/services/exam-attempts'
import { computed, defineComponent, PropType, ref } from 'vue'
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
import AppModal from '@/components/ui/AppModal.vue'
import useSnackbar from '@/composables/use-snackbar'
import coursesService from '@/services/courses'
import EmptyState from '@/components/EmptyState.vue'
import AttemptChecklistItem from '@/components/AttemptChecklistItem.vue'

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
    AppModal,
    EmptyState,
    AttemptChecklistItem
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
    },

    cameraStatus: {
      type: String as PropType<'enabled' | 'loading' | 'disabled'>,
      default: 'disabled'
    }
  },
  emits: ['update:starting'],
  setup(props, { emit }) {
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

    const startingModal = ref(false)

    const openStartingModal = () => {
      startingModal.value = true
      emit('update:starting', true)
    }

    const { setSnackbarMessage } = useSnackbar()

    return {
      exam,
      attempts,
      isLoading,
      hasError,
      startingModal,
      openStartingModal,
      setSnackbarMessage
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
    async startAttempt() {
      if (this.exam) {
        try {
          const attempt = await examAttemptsService.start(this.exam.id)
          this.$router.push(
            `/courses/${this.courseSlug}/${this.examSlug}/attempt/${attempt.id}`
          )
        } catch (error) {
          this.setSnackbarMessage('Attempt could not be started', 'error')
        }
      }
    },
    handleDelete(id: string) {
      this.attempts = this.attempts.filter(attempt => attempt.id !== id)
    }
  }
})
</script>
