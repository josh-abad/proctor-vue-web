<template>
  <li class="py-2 last:pb-0">
    <div class="flex justify-between items-start">
      <div class="flex items-center">
        <Avatar :user="attempt.user" class="w-6 h-6" />
        <span class="ml-2 text-lg font-medium first:ml-0">{{
          attempt.user.fullName
        }}</span>
      </div>
      <span class="text-sm text-gray-500">Started {{ startDate }}</span>
    </div>
    <div class="flex items-center mt-2 space-x-2">
      <div class="flex items-center">
        <DocumentTextIcon class="w-4 h-4" />
        <span class="ml-1.5">{{ attempt.exam.label }}</span>
      </div>
      <AttemptStatusBadge :attempt="attempt" />
    </div>
    <div
      class="flex items-center mt-1 text-gray-400"
      v-if="!['expired', 'in-progress'].includes(attempt.status)"
    >
      <ClockIcon class="w-4 h-4" />
      <span class="ml-1.5 text-sm">Completed in {{ attemptDuration }}</span>
    </div>
    <div
      class="
        flex
        items-center
        mt-1
        space-x-1.5
        text-sm
        font-semibold
        text-gray-400
      "
    >
      <ExclamationIcon class="w-4 h-4" />
      <span v-if="attempt.warnings > 0">
        {{ attempt.warnings }}
        {{ attempt.warnings === 1 ? 'warning' : 'warnings' }} out of 5
      </span>
      <span v-else>No warnings</span>
    </div>
    <div class="flex justify-between items-end mt-5">
      <div class="text-xl">{{ attempt.score }}/{{ attempt.examTotal }}</div>
      <div class="flex items-center">
        <GradeEssayModal
          :essays="essays"
          v-if="attempt.pendingGrade"
          @confirm="submitScores"
        />
        <router-link
          :to="`/courses/${attempt.exam.course.slug}/${attempt.exam.slug}/review/${attempt.id}`"
        >
          <AppButton class="ml-2" type="button" prominent>
            Review Answers
          </AppButton>
        </router-link>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Attempt, Score } from '@/types'
import { computed, defineComponent, PropType } from 'vue'
import {
  ClockIcon,
  DocumentTextIcon,
  ExclamationIcon
} from '@heroicons/vue/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Avatar from './Avatar.vue'
import AppButton from './ui/AppButton.vue'
import GradeEssayModal from './GradeEssayModal.vue'
import examAttemptsService from '@/services/exam-attempts'
import NProgress from 'nprogress'
import useSnackbar from '@/composables/use-snackbar'
import AttemptStatusBadge from './AttemptStatusBadge.vue'
import { formatDuration } from '@/utils/helper'

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'CourseActivityItem',
  components: {
    ClockIcon,
    DocumentTextIcon,
    ExclamationIcon,
    Avatar,
    AppButton,
    GradeEssayModal,
    AttemptStatusBadge
  },
  props: {
    attempt: {
      type: Object as PropType<Attempt>,
      required: true
    },
    modelValue: {
      type: Array as PropType<Attempt[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const attemptDuration = computed(() => {
      return formatDuration(
        dayjs(props.attempt.submittedDate).diff(
          dayjs(props.attempt.startDate),
          'seconds'
        )
      )
    })

    const startDate = computed(() => {
      return dayjs(props.attempt.startDate).fromNow()
    })

    const essays = computed(() => {
      return props.attempt.exam.examItems
        .filter(examItem => {
          return (
            examItem.questionType === 'essay' &&
            props.attempt.answers.some(
              answer =>
                answer.examItem === examItem.id &&
                !answer.hasPlagiarism &&
                answer.answer[0]?.length > 0
            )
          )
        })
        .map(examItem => {
          return {
            id: examItem.id,
            question: examItem.question,
            points: examItem.points,
            answer: props.attempt.answers.find(
              answer => answer.examItem === examItem.id
            )?.answer ?? ['']
          }
        })
    })

    const { setSnackbarMessage } = useSnackbar()

    const submitScores = async (scores: Score[]) => {
      try {
        NProgress.start()
        const updatedAttempt = await examAttemptsService.submitPendingGrade(
          props.attempt.id,
          scores
        )
        emit(
          'update:modelValue',
          props.modelValue.map(attempt =>
            attempt.id === props.attempt.id
              ? {
                  ...attempt,
                  score: updatedAttempt.score,
                  pendingGrade: updatedAttempt.pendingGrade
                }
              : attempt
          )
        )
      } catch (error) {
        setSnackbarMessage('Could not submit scores.', 'error')
      } finally {
        NProgress.done()
      }
    }

    return {
      attemptDuration,
      startDate,
      submitScores,
      essays
    }
  }
})
</script>
