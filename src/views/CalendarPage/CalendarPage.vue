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
import { Exam } from '@/types'
import dayjs from 'dayjs'
import usersService from '@/services/users'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CalendarPage',
  components: { CalendarMonth, EventsPanel },
  data () {
    return {
      value: '',
      events: [] as Exam[]
    }
  },
  computed: {
    eventsOnDate (): Exam[] {
      return this.events.filter(event => this.dateSame(event.startDate))
    },
    date (): string {
      return dayjs(this.value).format('MMMM D, YYYY')
    }
  },
  async created () {
    const id = this.$store.state.user?.id ?? ''
    this.events = await usersService.getUpcomingExams(id)
  },
  methods: {
    dateSame (d: Date) {
      return this.value === dayjs(d).format('YYYY-MM-DD')
    }
  }
})
</script>
