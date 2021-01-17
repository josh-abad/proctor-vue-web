<template>
  <div class="text-base font-normal flex items-center">
    <!-- Heroicon name: lock-closed -->
    <svg
      v-if="locked"
      class="fill-current text-gray-400 dark:text-gray-600 w-6 h-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-else-if="$store.getters.examTaken(exam.id, $store.state.user.id)"
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
import examMixin from '@/mixins/exam'

export default defineComponent({
  name: 'WeekExam',
  mixins: [examMixin],
  props: {
    exam: {
      type: Object as () => Exam,
      required: true
    }
  },
  computed: {
    locked (): boolean {
      return this.examLocked(this.exam)
    }
  }
})
</script>
