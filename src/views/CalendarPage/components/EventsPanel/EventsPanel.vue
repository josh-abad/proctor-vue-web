<template>
  <AppPanel>
    <div class="flex items-start justify-between">
      <div class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {{ date }}
      </div>
      <button class="focus:outline-none" @click="$emit('close')">
        <XIcon class="w-5 h-5 text-gray-500 fill-current hover:text-white" />
      </button>
    </div>
    <div class="text-lg font-semibold">Events</div>
    <div>
      <EventsPanelItem :event="event" v-for="event in events" :key="event.id" />
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import EventsPanelItem from './components/EventsPanelItem.vue'
import { XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'EventsPanel',
  components: { AppPanel, EventsPanelItem, XIcon },
  props: {
    date: {
      type: String,
      required: true
    },

    events: {
      type: Array as PropType<Exam[]>,
      required: true
    }
  },
  emits: ['close']
})
</script>
