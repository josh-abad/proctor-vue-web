<template>
  <div v-if="filteredEvents.length">
    <BaseLabel
      class="pb-2 border-b border-gray-300 dark:border-gray-700"
      emphasis
      >Upcoming Exams</BaseLabel
    >
    <div class="mt-4 space-y-1">
      <Accordion
        :label="events[0].location"
        v-for="(events, i) in eventsByCourse"
        :key="i"
      >
        <div class="rounded-lg divide-gray-300 dark:divide-gray-700">
          <UpcomingExamsListItem
            :examEvent="examEvent"
            v-for="(examEvent, i) in events.slice(0, 5)"
            :key="i"
            :priority="i"
          />
        </div>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import UpcomingExamsListItem from './UpcomingExamsListItem.vue'
import BaseLabel from './BaseLabel.vue'
import Accordion from './Accordion.vue'

export default defineComponent({
  name: 'UpcomingExams',
  components: { UpcomingExamsListItem, BaseLabel, Accordion },
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
    },
    eventsByCourse (): AppEvent[][] {
      const map = new Map(Array.from(this.filteredEvents, event => [event.location, [] as AppEvent[]]))
      this.filteredEvents.forEach(event => map.get(event.location)?.push(event))
      return Array.from(map.values())
    }
  }
})
</script>
