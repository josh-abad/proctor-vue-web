<template>
  <div>
    <div
      v-if="event"
      class="text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-08 text-sm"
    >
      <div class="px-3 py-2 flex justify-between">
        <div class="flex items-center space-x-1">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="Avatar"
            class="mr-2 w-5 h-5 object-cover rounded-full"
          />
          <router-link
            :to="event.subjectUrl"
            class="text-gray-700 dark:text-gray-300"
            >{{ event.subject }}</router-link
          >
          <span>{{ event.action }}</span>
          <router-link
            class="text-gray-900 dark:text-white"
            :to="event.predicateUrl || '#'"
            >{{ event.predicate || "" }}</router-link
          >
          <span>in</span>
          <router-link
            :to="event.locationUrl"
            class="text-gray-700 dark:text-gray-300"
            >{{ event.location }}</router-link
          >
        </div>
        <div>{{ formattedDate(event.date) }}</div>
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
  name: 'ActivityRow',
  props: {
    event: {
      type: Object as () => AppEvent,
      required: true
    },

    avatarUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      return dayjs(d).fromNow()
    }
  }
})
</script>
