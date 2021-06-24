<template>
  <div class="p-6">
    <div class="block space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
      <div class="flex-grow">
        <CalendarMonth v-model="date" :events="events" />
      </div>
      <teleport to="#modals">
        <AppModal v-model="modal" class="w-96">
          <template #header>{{ formattedDate }}</template>
          <template #body>
            <EventsPanel :exams="examsOnDate" :date="oldDate" />
          </template>
        </AppModal>
      </teleport>
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
import AppModal from '@/components/ui/AppModal.vue'

export default defineComponent({
  name: 'CalendarPage',
  components: { CalendarMonth, EventsPanel, AppModal },
  data() {
    return {
      date: '',
      /**
       * Extra ref to keep track of date even if `date` is empty.
       * This is to keep from displaying 'Invalid Date' while the modal closes.
       */
      oldDate: '',
      events: [] as Exam[],
      modal: false
    }
  },
  computed: {
    examsOnDate(): Exam[] {
      return this.events.filter(
        event =>
          event.startDate &&
          event.endDate &&
          (this.dateSame(event.startDate) || this.dateSame(event.endDate))
      )
    },
    formattedDate(): string {
      return dayjs(this.oldDate).format('MMMM D, YYYY')
    }
  },
  watch: {
    date(newDate: string) {
      this.modal = newDate.length > 0
      if (newDate.length > 0) {
        this.oldDate = newDate
      }
    },
    modal(isOpen: boolean) {
      if (!isOpen) {
        this.date = ''
      }
    }
  },
  async created() {
    this.events = await userService.getExams()
  },
  methods: {
    dateSame(d: Date) {
      return this.oldDate === dayjs(d).format('YYYY-MM-DD')
    }
  }
})
</script>
