<template>
  <ul v-if="exams.length > 0" class="separator-y dark:divide-gray-600">
    <EventsPanelItem
      :event="exam"
      v-for="exam in exams"
      :key="exam.id"
      :date="date"
    />
  </ul>
  <div v-else>No events occuring today.</div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import EventsPanelItem from './components/EventsPanelItem.vue'

export default defineComponent({
  name: 'EventsPanel',
  components: { EventsPanelItem },
  props: {
    date: {
      type: String,
      required: true
    },
    exams: {
      type: Array as PropType<Exam[]>,
      required: true
    }
  }
})
</script>
