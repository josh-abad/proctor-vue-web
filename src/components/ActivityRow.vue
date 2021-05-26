<template>
  <div>
    <div
      v-if="event"
      class="text-sm text-gray-600 bg-white dark:text-gray-400 dark:bg-gray-700"
    >
      <div class="flex justify-between px-3 py-2">
        <div class="flex items-center space-x-1">
          <img
            :src="event.avatarUrl"
            alt="Avatar"
            class="object-cover w-5 h-5 mr-2 rounded-full"
          />
          <router-link
            :to="event.subjectUrl"
            class="text-gray-700 dark:text-gray-300"
            >{{
              event.subjectId === $store.state.user?.id ? "You" : event.subject
            }}</router-link
          >
          <span>{{ event.action }}</span>
          <router-link
            class="text-gray-900 dark:text-white"
            :to="event.predicateUrl || '#'"
            >{{ event.predicate || "" }}</router-link
          >
          <span class="hidden sm:inline-block">in</span>
          <router-link
            :to="event.locationUrl"
            class="hidden text-gray-700 dark:text-gray-300 sm:inline-block"
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
import { defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'ActivityRow',
  props: {
    event: {
      type: Object as PropType<AppEvent>,
      required: true
    }
  },
  methods: {
    formattedDate (d: string | Date) {
      return dayjs(d).fromNow()
    }
  }
})
</script>
