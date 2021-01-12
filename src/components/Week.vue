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
      <WeekExam v-for="exam in exams" :key="exam.id" :exam="exam" />
    </div>
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'
import WeekExam from './WeekExam.vue'

export default defineComponent({
  name: 'Week',
  components: { BaseLabel, WeekExam },
  props: {
    week: {
      type: Number,
      required: true
    },
    expanded: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-collapse'],
  computed: {
    exams (): Exam[] {
      return this.$store.getters.examsByWeek(this.week)
    }
  }
})
</script>
