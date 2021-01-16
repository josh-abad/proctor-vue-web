<template>
  <div>
    <BaseLabel
      class="pb-2 border-b border-gray-300 dark:border-gray-700"
      emphasis
      >Upcoming Exams</BaseLabel
    >
    <div>
      <UpcomingExamsListItem
        :examEvent="examEvent"
        v-for="examEvent in filteredEvents"
        :key="examEvent.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import UpcomingExamsListItem from './UpcomingExamsListItem.vue'
import BaseLabel from './BaseLabel.vue'

export default defineComponent({
  name: 'UpcomingExams',
  components: { UpcomingExamsListItem, BaseLabel },
  computed: {
    upcomingExams (): AppEvent[] {
      return this.$store.getters.upcomingExams
    },
    /**
     * Only show when an exam is closing when it is already active
     */
    filteredEvents (): AppEvent[] {
      return this.upcomingExams.filter(examEvent => {
        if (examEvent.action === 'closes') {
          return !this.upcomingExams.some(event => event.subjectId === examEvent.subjectId && event.action === 'opens')
        }
        return true
      })
    }
  }
})
</script>
