<template>
  <AppPanel>
    <div class="flex items-start justify-between">
      <div class="text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {{ date }}
      </div>
      <button class="focus:outline-none" @click="$emit('close')">
        <!-- Heroicon name: x -->
        <svg
          class="w-5 h-5 text-gray-500 fill-current hover:text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="text-lg font-semibold">Events</div>
    <div>
      <EventsPanelItem :event="event" v-for="(event, i) in events" :key="i" />
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import EventsPanelItem from './components/EventsPanelItem.vue'

export default defineComponent({
  name: 'EventsPanel',
  components: { AppPanel, EventsPanelItem },
  props: {
    date: {
      type: String,
      required: true
    },

    events: {
      type: Array as () => AppEvent[],
      required: true
    }
  },
  emits: ['close']
})
</script>
