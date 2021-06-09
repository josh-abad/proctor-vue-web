<template>
  <li class="text-sm">
    <div class="flex justify-between py-2">
      <div class="flex items-center space-x-1">
        <router-link :to="activity.user.url">{{
          activity.user.id === $store.state.user?.id
            ? 'You'
            : activity.user.name
        }}</router-link>
        <span>{{ activity.status }}</span>
        <router-link :to="activity.exam.url || '#'">{{
          activity.exam.name || ''
        }}</router-link>
        <span class="hidden sm:inline-block">in</span>
        <router-link :to="activity.course.url" class="hidden sm:inline-block">{{
          activity.course.name
        }}</router-link>
      </div>
      <div class="text-gray-600 dark:text-gray-400">{{ date }}</div>
    </div>
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

<style lang="postcss" scoped>
a {
  @apply text-indigo-700 dark:text-indigo-300 hover:underline font-semibold;
}
</style>
