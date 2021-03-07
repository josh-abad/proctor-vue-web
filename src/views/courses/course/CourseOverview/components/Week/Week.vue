<template>
  <AppAccordion v-if="exams.length" :label="`Week ${week}`">
    <div class="week__exams">
      <WeekExam v-for="exam in exams" :key="exam.id" :exam="exam" />
    </div>
  </AppAccordion>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent } from 'vue'
import AppAccordion from '@/components/ui/AppAccordion.vue'
import WeekExam from './components/WeekExam.vue'

export default defineComponent({
  name: 'Week',
  components: { WeekExam, AppAccordion },
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

<style lang="postcss" scoped>
.week__exams {
  @apply space-y-2;
}
</style>
