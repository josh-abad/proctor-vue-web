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
        @close="value = ''"
        v-show="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EventsPanel from './components/EventsPanel/EventsPanel.vue'
import CalendarMonth from '@/components/Calendar/Calendar.vue'
import { Exam } from '@/types'
import dayjs from 'dayjs'
import userService from '@/services/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalendarPage',
  components: { CalendarMonth, EventsPanel },
  data() {
    return {
      value: '',
      events: [] as Exam[]
    }
  },
  computed: {
    eventsOnDate(): Exam[] {
      return this.events.filter(event => this.dateSame(event.startDate))
    },
    date(): string {
      return dayjs(this.value).format('MMMM D, YYYY')
    }
  },
  async created() {
    this.events = await userService.getUpcomingExams()
  },
  methods: {
    dateSame(d: Date) {
      return this.value === dayjs(d).format('YYYY-MM-DD')
    }
  }
})
</script>
