<template>
  <div v-if="hasError">Invalid attempt</div>
  <List v-else-if="isLoading">
    <div class="flex w-full mt-4 first:mt-0" v-for="i in 10" :key="i">
      <AppSkeleton class="w-6 h-6 mt-4" />
      <div class="py-4 pl-4">
        <AppSkeleton class="h-5 w-52" />
        <AppSkeleton class="mt-4 w-60 h-7" />
      </div>
    </div>
  </List>
  <div v-else-if="attempt">
    <div>
      <List>
        <BaseExamItem
          :id="`question${i + 1}`"
          v-for="(item, i) in examItems"
          class="py-6 first:pt-0"
          :key="item.id"
          :exam-item="item"
          :question-number="i + 1"
          v-model="answers"
        />
      </List>
      <teleport to="#quiz-navigation">
        <ExamNavigation :questions="progress" class="mt-4 sm:mt-0 sm:ml-4" />
      </teleport>
    </div>
    <div class="flex items-center justify-between mt-4">
      <teleport to="#timer">
        <Timer :end="attempt.endDate" @timer-ended="handleSubmit" />
      </teleport>
      <ModalButton
        header="Submit Answers"
        :message="
          allQuestionsAnswered
            ? 'Are you sure you want to submit your answers?'
            : 'You have not answered all questions.'
        "
        action-label="Submit"
        @confirm="handleSubmit"
        :prominent="allQuestionsAnswered"
        :danger="!allQuestionsAnswered"
      >
        Submit
      </ModalButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref, watch } from 'vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import { Answer, AttemptWithResult, ExamItem } from '@/types'
import useFetch from '@/composables/use-fetch'
import { useRouter } from 'vue-router'
import examResultsService from '@/services/exam-results'
import examAttemptsService from '@/services/exam-attempts'
import Timer from '@/components/Timer.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import List from '@/components/List.vue'
import NProgress from 'nprogress'
import ExamNavigation from '@/components/ExamNavigation.vue'
import useTitle from '@/composables/use-title'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'ExamPage',
  components: {
    BaseExamItem,
    ModalButton,
    Timer,
    AppSkeleton,
    List,
    ExamNavigation
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

    id: {
      type: String,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    },

    setup: {
      type: Boolean,
      default: true
    },

    warnings: {
      type: Number,
      default: 0
    },

    isSetupComplete: {
      type: Boolean,
      default: true
    },

    examSubmittedModal: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:active',
    'update:setup',
    'update:examSubmittedModal',
    'update:warnings'
  ],
  setup(props, { emit }) {
    const router = useRouter()

    const answers = ref<Answer[]>([])

    const [attempt, fetchAttempt, isLoading, hasError] =
      useFetch<AttemptWithResult | null>(() =>
        examAttemptsService.getAttempt(props.id, 'in-progress')
      )

    const { setTitle } = useTitle()

    emit('update:setup', true)
    NProgress.start()
    fetchAttempt()
      .then(() => {
        emit('update:active', true)
        if (props.isSetupComplete) {
          emit('update:setup', false)
        }
        if (attempt.value) {
          emit('update:warnings', attempt.value.warnings)
          setTitle(`${attempt.value.exam.label} - Proctor Vue`)
        }
      })
      .finally(NProgress.done)

    watch(
      () => props.isSetupComplete,
      isComplete => {
        if (isComplete) {
          emit('update:setup', false)
        }
      }
    )

    const shuffledExamItems = computed<ExamItem[]>(() => {
      if (!attempt.value) {
        return []
      }
      if (
        attempt.value.exam.length === attempt.value.exam.examItems.length &&
        !attempt.value.exam.random
      ) {
        return attempt.value.exam.examItems
      }
      return attempt.value.examItems
        .map(id => attempt.value?.exam.examItems.find(e => e.id === id))
        .filter(e => e !== undefined) as ExamItem[]
    })

    const { setSnackbarMessage } = useSnackbar()

    const handleSubmit = async () => {
      if (attempt.value) {
        try {
          NProgress.start()
          await examResultsService.submit({
            answers: answers.value,
            examId: attempt.value.exam.id,
            attemptId: attempt.value.id
          })
          await router.replace(`/courses/${props.courseSlug}/${props.examSlug}`)
          emit('update:active', false)
          emit('update:setup', false)
        } catch (error) {
          setSnackbarMessage('Could not submit exam.', 'error')
        } finally {
          NProgress.done()
        }
      }
    }

    onUnmounted(() => {
      emit('update:active', false)
      emit('update:setup', false)
    })

    watch(
      () => props.warnings,
      async warnings => {
        if (attempt.value) {
          await examAttemptsService.addWarning(attempt.value.id)
          if (warnings >= attempt.value.exam.maxWarnings) {
            await handleSubmit()
            emit('update:examSubmittedModal', true)
          }
        }
      }
    )

    const progress = computed(() => {
      return shuffledExamItems.value.map((examItem, index) => {
        return {
          questionNumber: index + 1,
          id: examItem.id,
          answered: answers.value.some(
            answer => answer.examItem === examItem.id && answer.answer.length
          )
        }
      })
    })

    const allQuestionsAnswered = computed(() => {
      return (
        progress.value.filter(({ answered }) => answered).length ===
        shuffledExamItems.value.length
      )
    })

    return {
      answers,
      attempt,
      isLoading,
      hasError,
      handleSubmit,
      examItems: shuffledExamItems,
      progress,
      allQuestionsAnswered
    }
  }
})
</script>
