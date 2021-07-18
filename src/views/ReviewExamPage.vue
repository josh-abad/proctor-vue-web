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
    <List>
      <BaseExamItem
        :id="`question${i + 1}`"
        v-for="(item, i) in examItems"
        class="py-6 first:pt-0"
        :key="item.id"
        :exam-item="item"
        :question-number="i + 1"
        v-model="attempt.answers"
        :score="item.score"
        readonly
      />
    </List>
    <teleport to="#quiz-navigation">
      <ExamNavigation :questions="progress" class="mt-4 sm:mt-0 sm:ml-4" />
      <AppPanel class="px-3 py-3 mt-4 sm:ml-4">
        <Subheading>
          <AppLabel emphasis>Attempt Details</AppLabel>
        </Subheading>
        <div class="mt-3">
          <div class="flex items-center">
            <Avatar :user="attempt.user" class="w-6 h-6" />
            <span class="ml-2 text-lg font-medium">
              {{ attempt.user.fullName }}
            </span>
          </div>
          <div
            class="flex items-center mt-2 text-gray-400"
            v-if="!['expired', 'in-progress'].includes(attempt.status)"
          >
            <ClockIcon class="w-4 h-4" />
            <span class="ml-1.5 text-sm"
              >Completed in {{ attemptDuration }}</span
            >
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
          <div class="flex items-center mt-5">
            <div class="text-xl">
              {{ attempt.score }}/{{ attempt.examTotal }}
            </div>
            <AttemptStatusBadge class="ml-2" :attempt="attempt" />
          </div>
        </div>
      </AppPanel>
    </teleport>

    <div class="flex justify-end mt-4">
      <AppButton type="button" @click="$router.back">Go Back</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import useFetch from '@/composables/use-fetch'
import examAttemptsService from '@/services/exam-attempts'
import { AttemptWithResult, ExamItem } from '@/types'
import { computed, defineComponent } from 'vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import ExamNavigation from '@/components/ExamNavigation.vue'
import List from '@/components/List.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import Avatar from '@/components/Avatar.vue'
import Subheading from '@/components/Subheading.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import dayjs from 'dayjs'
import AttemptStatusBadge from '@/components/AttemptStatusBadge.vue'
import { formatDuration } from '@/utils/helper'
import { ClockIcon, ExclamationIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'ReviewExamPage',
  components: {
    BaseExamItem,
    AppSkeleton,
    ExamNavigation,
    List,
    AppButton,
    AppPanel,
    Avatar,
    Subheading,
    AppLabel,
    AttemptStatusBadge,
    ClockIcon,
    ExclamationIcon
  },
  props: {
    courseSlug: {
      type: String,
      requird: true
    },

    examSlug: {
      type: String,
      requird: true
    },

    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [attempt, fetchAttempt, isLoading, hasError] =
      useFetch<AttemptWithResult | null>(() =>
        examAttemptsService.getAttempt(props.id)
      )

    fetchAttempt()

    const examItems = computed(() => {
      return (
        (attempt.value?.examItems
          .map(id => {
            const examItem = attempt.value?.exam.examItems.find(
              e => e.id === id
            )
            if (examItem === undefined) {
              return undefined
            }
            return {
              ...examItem,
              score:
                attempt.value?.examResult?.scores.find(
                  score => score.examItem === examItem?.id
                )?.points ?? 0
            }
          })
          .filter(e => e !== undefined) as (ExamItem & { score: number })[]) ??
        []
      )
    })

    const progress = computed(() => {
      return examItems.value.map((examItem, index) => {
        return {
          questionNumber: index + 1,
          id: examItem.id,
          answered:
            attempt.value?.answers.some(
              answer => answer.examItem === examItem.id && answer.answer.length
            ) ?? false
        }
      })
    })

    const attemptDuration = computed(() => {
      if (!attempt.value) {
        return ''
      }
      return formatDuration(
        dayjs(attempt.value.submittedDate).diff(
          dayjs(attempt.value.startDate),
          'seconds'
        )
      )
    })

    return {
      attempt,
      attemptDuration,
      isLoading,
      hasError,
      progress,
      examItems
    }
  }
})
</script>
