<template>
  <div class="text-gray-700 dark:text-gray-300">
    <router-link
      :to="examEvent.subjectUrl"
      class="font-semibold text-gray-900 dark:text-white"
      >{{ examEvent.subject }}</router-link
    >
    {{ examEvent.action }}
    {{ formattedDate }}
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UpcomingExamsListItem',
  props: {
    examEvent: {
      type: Object as () => AppEvent,
      required: true
    }
  },
  computed: {
    formattedDate (): string {
      return dayjs(this.examEvent.date).fromNow()
    }
  }
})
</script>
