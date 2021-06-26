<template>
  <AppAccordion v-if="exams.length" :label="`Week ${week}`">
    <ul class="space-y-2">
      <WeekExam
        v-for="exam in exams"
        :key="exam.id"
        :exam="exam"
        :course-slug="courseSlug"
      />
    </ul>
  </AppAccordion>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppAccordion from '@/components/ui/AppAccordion.vue'
import WeekExam from './components/WeekExam.vue'
import { ExamWithTaken } from '@/types'

export default defineComponent({
  name: 'Week',
  components: { WeekExam, AppAccordion },
  props: {
    courseSlug: {
      type: String,
      required: true
    },

    week: {
      type: Number,
      required: true
    },

    exams: {
      type: Array as PropType<ExamWithTaken[]>,
      required: true
    }
  }
})
</script>
