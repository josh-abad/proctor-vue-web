<template>
  <FadeTransition>
    <div v-if="hasError" class="flex justify-center pt-8 text-gray-500">
      Could not load activities
    </div>
    <List v-else-if="isLoading">
      <div class="flex justify-between py-3" v-for="i in 5" :key="i">
        <AppSkeleton class="h-3" :class="i % 2 === 0 ? 'w-52' : 'w-60'" />
        <AppSkeleton class="h-3 w-14" />
      </div>
    </List>
    <List v-else-if="activities.length">
      <ActivityRow
        v-for="(event, i) of activities"
        :key="i"
        :activity="event"
        class="last:pb-0"
      />
    </List>
    <div v-else class="flex justify-center py-8 text-gray-500">
      No activity to display.
    </div>
  </FadeTransition>
</template>

<script lang="ts">
import { ExamActivity, Attempt } from '@/types'
import { defineComponent, PropType } from '@vue/runtime-core'
import AppSkeleton from './ui/AppSkeleton.vue'
import ActivityRow from './ActivityRow.vue'
import List from './List.vue'
import FadeTransition from './transitions/FadeTransition.vue'

export default defineComponent({
  name: 'ActivityList',
  components: { AppSkeleton, ActivityRow, List, FadeTransition },
  props: {
    attempts: {
      type: Array as PropType<Attempt[]>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activities(): ExamActivity[] {
      const activities: ExamActivity[] = []
      for (const attempt of this.attempts) {
        if (attempt.exam === null) {
          continue
        }

        if (activities.length === this.attempts.length) {
          break
        }

        const sharedEventInfo = {
          course: {
            name: attempt.exam.course.name,
            url: `/courses/${attempt.exam.course.slug}`
          },
          user: {
            name: attempt.user.name.first,
            id: attempt.user.id,
            url: `/user/${attempt.user.id}`
          },
          exam: {
            name: attempt.exam.label,
            url: `/courses/${attempt.exam.course.slug}/${attempt.exam.slug}`
          }
        }
        const startedActivity: ExamActivity = {
          ...sharedEventInfo,
          status: 'started',
          date: attempt.startDate
        }
        activities.push(startedActivity)

        if (
          attempt.status === 'completed' &&
          activities.length < this.attempts.length
        ) {
          const completedActivity: ExamActivity = {
            ...sharedEventInfo,
            status: 'completed',
            date: attempt.submittedDate
          }
          activities.push(completedActivity)
        }
      }

      activities.sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf()
      })

      return activities
    }
  }
})
</script>
