<template>
  <div
    class="px-2 py-1 text-gray-700 dark:text-gray-300"
    :class="priorityOpacity"
  >
    <div class="flex justify-between">
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <!-- Heroicon name: lock-open -->
          <path
            class="text-green-500"
            :class="priorityOpacity"
            v-if="examEvent.action === 'opens'"
            d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
          />
          <!-- Heroicon name: lock-closed -->
          <path
            v-else
            class="text-red-500"
            :class="priorityOpacity"
            fill-rule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clip-rule="evenodd"
          />
        </svg>
        <router-link
          :to="examEvent.subjectUrl"
          class="ml-2 font-semibold text-gray-900 dark:text-white"
          :class="priorityOpacity"
          >{{ examEvent.subject }}</router-link
        >
        <span>
          <span
            class="text-green-800 dark:text-green-200"
            :class="{
              'text-green-800 dark:text-green-200':
                examEvent.action === 'opens',
              'text-red-800 dark:text-red-200': examEvent.action === 'closes',
              [`${priorityOpacity}`]: true,
            }"
            >{{ examEvent.action }}</span
          >
          {{ relativeDate }}
        </span>
      </div>
      <div class="text-gray-500" :class="priorityOpacity">
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const OPACITY = [100, 80, 60, 40, 20, 0]

export default defineComponent({
  name: 'UpcomingExamsListItem',
  props: {
    examEvent: {
      type: Object as () => AppEvent,
      required: true
    },

    priority: {
      type: Number,
      default: 0
    }
  },
  computed: {
    relativeDate (): string {
      return dayjs(this.examEvent.date).fromNow()
    },
    formattedDate (): string {
      return dayjs(this.examEvent.date).format('MMMM DD, YYYY')
    },
    priorityOpacity (): string {
      return `text-opacity-${OPACITY[this.priority]} dark:text-opacity-${OPACITY[this.priority]}`
    }
  },
  mounted () {
    console.log(this.priorityOpacity)
  }
})
</script>
