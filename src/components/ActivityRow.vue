<template>
  <div>
    <div
      v-if="attempt.exam && attempt.exam.course"
      class="text-gray-600 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 text-sm"
    >
      <div class="px-3 py-2 flex justify-between">
        <div>
          <span class="text-green-800 dark:text-gray-300">{{ name }}</span>
          {{ attempt.status === "completed" ? "completed" : "started" }}
          <router-link
            class="text-gray-900 dark:text-white"
            :to="`/courses/${attempt.exam.course.id}/exams/${attempt.exam.id}`"
            >{{ attempt.exam.label }}</router-link
          >
          in
          <router-link
            :to="`/courses/${attempt.exam.course.id}`"
            class="text-green-800 dark:text-gray-300"
            >{{ attempt.exam.course.name }}</router-link
          >
        </div>
        <div>
          {{
            formattedDate(
              attempt.status === "completed"
                ? attempt.submittedDate
                : attempt.startDate
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'ActivityRow',
  props: {
    name: {
      type: String,
      required: true
    },
    attempt: {
      type: Object as () => Attempt,
      required: true
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      return dayjs(d).fromNow()
    }
  }
})
</script>
