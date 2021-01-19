<template>
  <BasePanel class="ml-4 w-80">
    <div class="flex justify-between items-start">
      <div class="uppercase text-xs tracking-wider font-semibold text-gray-500">
        {{ date }}
      </div>
      <button class="focus:outline-none" @click="$emit('close')">
        <!-- Heroicon name: x -->
        <svg
          class="fill-current text-gray-500 hover:text-white w-5 h-5"
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
    <div class="font-semibold text-lg">Events</div>
    <div>
      <EventsPanelItem :event="event" v-for="(event, i) in events" :key="i" />
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import BasePanel from './BasePanel.vue'
import EventsPanelItem from './EventsPanelItem.vue'

export default defineComponent({
  name: 'EventsPanel',
  components: { BasePanel, EventsPanelItem },
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
