<template>
  <div class="py-1 text-gray-700 dark:text-gray-300 text-sm">
    <div class="flex justify-between">
      <div class="flex items-start space-x-1 w-full">
        <svg class="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <!-- Heroicon name: document-text -->
          <path
            v-if="examEvent.action === 'opens'"
            class="text-green-500 dark:text-green-300"
            fill-rule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
          <!-- Heroicon name: lock-closed -->
          <path
            v-else
            class="text-red-500"
            fill-rule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <div class="flex">
            <span>
              <router-link
                :to="examEvent.subjectUrl"
                class="inline font-semibold text-gray-900 dark:text-white"
                >{{ examEvent.subject }}</router-link
              >
              <span
                class="ml-1 text-green-200"
                :class="
                  examEvent.action === 'opens'
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                "
                >{{ examEvent.action }}</span
              >
              {{ relativeDate }}
            </span>
          </div>
          <div class="text-gray-500 text-xs">
            {{ formattedDate }}
          </div>
        </div>
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

export default defineComponent({
  name: 'Item',
  props: {
    examEvent: {
      type: Object as () => AppEvent,
      required: true
    }
  },
  computed: {
    relativeDate (): string {
      return dayjs(this.examEvent.date).fromNow()
    },
    formattedDate (): string {
      return dayjs(this.examEvent.date).format('MMMM DD, YYYY')
    }
  }
})
</script>
