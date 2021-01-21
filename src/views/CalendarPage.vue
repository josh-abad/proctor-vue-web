<template>
  <div class="p-6">
    <div class="flex">
      <div class="flex-grow">
        <CalendarMonth v-model="value" :events="events" />
      </div>
      <EventsPanel
        :date="date"
        :events="eventsOnDate"
        @close="value = null"
        v-show="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EventsPanel from '@/components/EventsPanel.vue'
import CalendarMonth from '@/components/CalendarMonth.vue'
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
