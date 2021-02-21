<template>
  <div class="p-6">
    <div class="block space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
      <div class="flex-grow">
        <CalendarMonth v-model="value" :events="events" />
      </div>
      <EventsPanel
        class="w-full sm:w-80"
        :date="date"
        :events="eventsOnDate"
        @close="value = null"
        v-show="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EventsPanel from './components/EventsPanel/EventsPanel.vue'
import CalendarMonth from '@/components/Calendar/Calendar.vue'
import { AppEvent } from '@/types'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalendarPage',
  components: { CalendarMonth, EventsPanel },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    events (): AppEvent[] {
      return this.$store.getters.examEvents
    },
    eventsOnDate (): AppEvent[] {
      return this.events.filter(event => this.dateSame(event.date))
    },
    date (): string {
      return dayjs(this.value).format('MMMM D, YYYY')
    }
  },
  methods: {
    dateSame (d: Date): boolean {
      return this.value === dayjs(d).format('YYYY-MM-DD')
    }
  }
})
</script>
