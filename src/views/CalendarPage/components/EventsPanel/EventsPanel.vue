<template>
  <List v-if="exams.length > 0" class="dark:divide-gray-600">
    <EventsPanelItem
      :event="exam"
      v-for="exam in exams"
      :key="exam.id"
      :date="date"
    />
  </List>
  <div v-else>No events occuring today.</div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import EventsPanelItem from './components/EventsPanelItem.vue'
import List from '@/components/List.vue'

export default defineComponent({
  name: 'EventsPanel',
  components: { EventsPanelItem, List },
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
