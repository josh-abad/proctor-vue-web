<template>
  <AppAccordion v-if="exams.length" :label="`Week ${week}`">
    <div class="week__exams">
      <WeekExam v-for="exam in exams" :key="exam.id" :exam="exam" />
    </div>
  </AppAccordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppAccordion from '@/components/ui/AppAccordion.vue'
import WeekExam from './components/WeekExam.vue'
import useFetch from '@/composables/use-fetch'
import courses from '@/services/courses'

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
  setup (props) {
    const [
      exams,
      fetchExams,
      loading,
      error
    ] = useFetch(() => courses.getExamsByWeek(props.courseId, props.week), [])

    fetchExams()

    return {
      exams,
      loading,
      error
    }
  }
})
</script>

<style lang="postcss" scoped>
.week__exams {
  @apply space-y-2;
}
</style>
