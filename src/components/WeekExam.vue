<template>
  <div class="text-base font-normal flex items-center">
    <svg
      v-if="$store.getters.examTaken(exam.id, $store.state.user.id)"
      class="stroke-current text-green-500 w-6 h-6"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
    <svg
      v-else
      class="stroke-current text-gray-400 dark:text-gray-600 w-6 h-6"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
    <router-link
      :to="`/courses/${exam.course.id}/exams/${exam.id}`"
      class="ml-2 text-lg"
      >{{ exam.label }}</router-link
    >
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeekExam',
  props: {
    exam: {
      type: Object as () => Exam
    }
  }
})
</script>
