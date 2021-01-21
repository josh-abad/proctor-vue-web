<template>
  <BasePanel v-if="upcomingExams.length">
    <div class="font-bold">Upcoming Exams</div>
    <div class="mt-4 space-y-1">
      <Accordion
        :label="events?.[0].location || ''"
        v-for="(events, i) in eventsByCourse"
        :key="i"
      >
        <div
          class="fixed bg-gradient-to-t from-dark-02 to-transparent bottom-0 left-0 w-full h-1/2"
        />
        <div class="rounded-lg divide-gray-700">
          <UpcomingExamsListItem
            :examEvent="examEvent"
            v-for="(examEvent, i) in events.slice(0, 5)"
            :key="i"
          />
        </div>
      </Accordion>
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import UpcomingExamsListItem from './UpcomingExamsListItem.vue'
import Accordion from './Accordion.vue'
import BasePanel from './BasePanel.vue'

export default defineComponent({
  name: 'UpcomingExams',
  components: { UpcomingExamsListItem, Accordion, BasePanel },
  computed: {
    upcomingExams (): AppEvent[] {
      return this.$store.getters.upcomingExams
    },
    eventsByCourse (): AppEvent[][] {
      const map = new Map(Array.from(this.upcomingExams, event => [event.location, [] as AppEvent[]]))
      this.upcomingExams.forEach(event => map.get(event.location)?.push(event))
      return Array.from(map.values())
    }
  }
})
</script>
