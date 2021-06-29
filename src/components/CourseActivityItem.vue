<template>
  <li class="py-2 last:pb-0">
    <div class="flex items-start justify-between">
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
      <span v-if="attempt.status === 'completed'">
        <Badge
          v-if="attempt.pendingGrade"
          class="text-yellow-500 bg-yellow-500/10"
        >
          Grade Pending
        </Badge>
        <Badge
          v-else-if="attempt.warnings >= 5"
          class="text-red-500 bg-red-500/10"
        >
          Stopped
        </Badge>
        <Badge v-else class="text-green-500 bg-green-500/10">Complete</Badge>
      </span>
      <Badge
        v-else-if="attempt.status === 'in-progress'"
        class="text-white bg-white/10"
      >
        In-Progress
      </Badge>
      <Badge v-else class="text-red-500 bg-red-500/10"> Expired </Badge>
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
        mt-1
        text-gray-400
        font-semibold
        text-sm
        space-x-1.5
        flex
        items-center
      "
    >
      <ExclamationIcon class="w-4 h-4" />
      <span v-if="attempt.warnings > 0">
        {{ attempt.warnings }}
        {{ attempt.warnings === 1 ? 'warning' : 'warnings' }} out of 5
      </span>
      <span v-else>No warnings</span>
    </div>
    <div class="flex items-end justify-between mt-5">
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
import Badge from '@/components/Badge.vue'
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

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'CourseActivityItem',
  components: {
    Badge,
    ClockIcon,
    DocumentTextIcon,
    ExclamationIcon,
    Avatar,
    AppButton,
    GradeEssayModal
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
      const duration = dayjs(props.attempt.submittedDate).diff(
        dayjs(props.attempt.startDate),
        'seconds'
      )

      const d = Math.floor(duration / (3600 * 24))
      const h = Math.floor((duration % (3600 * 24)) / 3600)
      const m = Math.floor((duration % 3600) / 60)
      const s = Math.floor(duration % 60)

      const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : ''
      const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
      const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
      const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
      return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, '')
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
                answer.examItem === examItem.id && answer.answer[0]?.length > 0
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
