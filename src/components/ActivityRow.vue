<template>
  <li class="text-sm flex justify-between py-2">
    <div class="flex items-center space-x-1">
      <router-link
        :to="activity.user.url"
        class="
          font-semibold
          text-indigo-700
          dark:text-indigo-300
          hover:underline
        "
        >{{
          activity.user.id === $store.state.user?.id
            ? 'You'
            : activity.user.name
        }}</router-link
      >
      <span>{{ activity.status }}</span>
      <router-link
        :to="activity.exam.url || '#'"
        class="
          font-semibold
          text-indigo-700
          dark:text-indigo-300
          hover:underline
        "
        >{{ activity.exam.name || '' }}</router-link
      >
      <span class="hidden sm:inline-block">in</span>
      <router-link
        :to="activity.course.url"
        class="
          hidden
          font-semibold
          text-indigo-700
          sm:inline-block
          dark:text-indigo-300
          hover:underline
        "
        >{{ activity.course.name }}</router-link
      >
    </div>
    <div class="text-gray-600 dark:text-gray-400">{{ date }}</div>
  </li>
</template>

<script lang="ts">
import { ExamActivity } from '@/types'
import { defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'ActivityRow',
  props: {
    activity: {
      type: Object as PropType<ExamActivity>,
      required: true
    }
  },
  computed: {
    date(): string {
      return dayjs(this.activity.date).fromNow()
    }
  }
})
</script>
