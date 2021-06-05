<template>
  <li class="text-sm text-gray-600 dark:text-gray-400">
    <div class="flex justify-between py-2">
      <div class="flex items-center space-x-1">
        <router-link
          :to="event.subjectUrl"
          class="text-gray-700 dark:text-gray-300"
          >{{
            event.subjectId === $store.state.user?.id ? 'You' : event.subject
          }}</router-link
        >
        <span>{{ event.action }}</span>
        <router-link
          class="text-gray-900 dark:text-white"
          :to="event.predicateUrl || '#'"
          >{{ event.predicate || '' }}</router-link
        >
        <span class="hidden sm:inline-block">in</span>
        <router-link
          :to="event.locationUrl"
          class="hidden text-gray-700 dark:text-gray-300 sm:inline-block"
          >{{ event.location }}</router-link
        >
      </div>
      <div>{{ date }}</div>
    </div>
  </li>
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
  computed: {
    date(): string {
      return dayjs(this.event.date).fromNow()
    }
  }
})
</script>
