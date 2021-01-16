<template>
  <div class="flex items-center">
    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <!-- Heroicon name: lock-open -->
      <path
        v-if="event.action === 'opens'"
        d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
      />
      <!-- Heroicon name: lock-closed -->
      <path
        v-else
        fill-rule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clip-rule="evenodd"
      />
    </svg>
    <div class="ml-2">
      <div class="text-gray-700 dark:text-gray-300">
        <router-link
          :to="event.subjectUrl"
          class="font-semibold text-gray-900 dark:text-white"
          >{{ event.subject }}</router-link
        >
        {{ action }}
      </div>
      <router-link
        :to="event.locationUrl"
        class="block text-xs uppercase font-semibold tracking-wider text-gray-500"
      >
        {{ event.location }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EventsPanelItem',
  props: {
    event: {
      type: Object as () => AppEvent,
      required: true
    }
  },
  computed: {
    action (): string {
      const today = dayjs()
      if (dayjs(this.event.date).isAfter(today)) {
        return this.event.action
      }
      return this.event.action === 'opens' ? 'opened' : 'closed'
    }
  }
})
</script>
