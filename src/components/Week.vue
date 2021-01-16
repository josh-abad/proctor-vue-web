<template>
  <Accordion :label="`Week ${week}`">
    <WeekExam v-for="exam in exams" :key="exam.id" :exam="exam" />
  </Accordion>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent } from 'vue'
import Accordion from './Accordion.vue'
import WeekExam from './WeekExam.vue'

export default defineComponent({
  name: 'Week',
  components: { WeekExam, Accordion },
  props: {
    courseId: {
      type: String,
      required: true
    },

    week: {
      type: Number,
      required: true
    }
  },
  computed: {
    exams (): Exam[] {
      return this.$store.getters.examsByWeek(this.courseId, this.week)
    }
  }
})
</script>
