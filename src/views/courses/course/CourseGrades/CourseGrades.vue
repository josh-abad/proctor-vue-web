<template>
  <div class="table-bg" v-if="courseGrades">
    <table>
      <tr class="table-header">
        <td>Test</td>
        <td class="table-data prominent">Weight</td>
        <td class="table-data prominent">Grade</td>
        <td class="table-data prominent">Total</td>
      </tr>
      <tbody>
        <tr v-for="exam in courseGrades.exams" :key="exam.id">
          <td>
            <router-link
              :to="`/courses/${courseGrades?.courseId}/exams/${exam.id}`"
              class="inline-flex items-center"
            >
              <DocumentTextIcon class="w-5 h-5 mr-1 fill-current" />
              {{ exam.label }}
            </router-link>
          </td>
          <td class="table-data">{{ exam.weightPercentage }}%</td>
          <td class="table-data prominent">{{ exam.grade }}</td>
          <td class="table-data">
            {{ Math.floor(exam.grade * exam.weight) }}%
          </td>
        </tr>
      </tbody>
      <tr class="table-footer">
        <td>
          Total
          <div class="hidden text-sm font-normal text-gray-500 sm:block">
            Weighted mean of grades
          </div>
        </td>
        <td />
        <td />
        <td class="table-data prominent course-total-value">
          {{ courseGrades.courseTotal }}%
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DocumentTextIcon } from '@heroicons/vue/solid'
import useFetch from '@/composables/use-fetch'
import userService from '@/services/user'
import { CourseGrades } from '@/types'

export default defineComponent({
  name: 'CourseGrades',
  components: { DocumentTextIcon },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [courseGrades, fetchCourseGrades, loading, error] =
      useFetch<CourseGrades | null>(() =>
        userService.getGradesForCourse(props.courseId)
      )

    fetchCourseGrades()

    return {
      courseGrades,
      loading,
      error
    }
  }
})
</script>

<style lang="postcss" scoped>
.table-bg {
  @apply bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden;
}

table {
  @apply w-full;
}

td {
  @apply px-4 py-2;
}

.table-data {
  @apply text-right text-gray-600 dark:text-gray-400;
}

tbody {
  @apply divide-y divide-gray-200 dark:divide-gray-600;
}

.table-header {
  @apply border-b;
}

.table-header,
.table-footer > td {
  @apply w-3 font-semibold;
}

.table-footer {
  @apply border-t bg-white dark:bg-gray-700;
}

.table-header,
.table-footer {
  @apply border-gray-200 dark:border-gray-600;
}

.prominent {
  @apply text-gray-900 dark:text-white;
}

.course-total-value {
  @apply text-xl tracking-wide;
}
</style>
