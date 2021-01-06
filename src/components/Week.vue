<template>
  <div :key="week" :id="`week-${week}`">
    <div class="flex items-center pt-4 pb-2">
      <div
        @click="$emit('toggle-collapse')"
        class="cursor-pointer dark:text-gray-400 dark:hover:text-white"
      >
        <svg class="w-5 h-5 mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            v-if="expanded"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <BaseLabel class="ml-2 mb-0" emphasis> Week {{ week }} </BaseLabel>
    </div>
    <div
      v-show="expanded"
      class="py-4 border-t border-gray-300 dark:border-gray-700"
    >
      <div
        class="text-base font-normal flex items-center"
        v-for="exam in exams"
        :key="exam.id"
      >
        <svg
          v-if="$store.getters.examTaken(exam.id)"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import BaseLabel from './BaseLabel.vue'

export default defineComponent({
  components: { BaseLabel },
  name: 'Week',
  emits: ['toggle-collapse'],
  props: {
    week: {
      type: Number,
      required: true
    },
    expanded: {
      type: Boolean,
      required: true
    },
    exams: {
      type: Array as PropType<Exam[]>,
      required: true
    }
  }
})
</script>
