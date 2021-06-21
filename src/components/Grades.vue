<template>
  <table>
    <tr class="table-header">
      <td>Test</td>
      <td class="table-data prominent">Weight</td>
      <td class="table-data prominent">Grade</td>
      <td class="table-data prominent">Total</td>
    </tr>
    <tbody>
      <tr v-for="exam in grades.exams" :key="exam.id">
        <td>
          <router-link
            :to="`/courses/${grades.courseSlug}/${exam.slug}`"
            class="inline-flex items-center"
          >
            <DocumentTextIcon class="w-5 h-5 mr-1 fill-current" />
            {{ exam.label }}
          </router-link>
        </td>
        <td class="table-data">{{ exam.weightPercentage }}%</td>
        <td class="table-data prominent">{{ exam.grade }}</td>
        <td class="table-data">{{ Math.floor(exam.grade * exam.weight) }}%</td>
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
        {{ grades.courseTotal }}%
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DocumentTextIcon } from '@heroicons/vue/solid'
import { CourseGrades } from '@/types'

export default defineComponent({
  name: 'CourseGrades',
  components: { DocumentTextIcon },
  props: {
    grades: {
      type: Object as PropType<CourseGrades>,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
table {
  @apply w-full;
}

td {
  @apply py-2;
}

.table-data {
  @apply text-right text-gray-600 dark:text-gray-400;
}

tbody {
  @apply divide-y divide-gray-300 dark:divide-gray-700;
}

.table-header {
  @apply border-b;
}

.table-header,
.table-footer > td {
  @apply w-3 font-semibold;
}

.table-footer {
  @apply border-t;
}

.table-header,
.table-footer {
  @apply border-gray-300 dark:border-gray-700;
}

.prominent {
  @apply text-gray-900 dark:text-white;
}

.course-total-value {
  @apply text-xl tracking-wide;
}
</style>
