<template>
  <table class="w-full">
    <tr class="w-3 font-semibold border-b border-gray-300 dark:border-gray-700">
      <td class="py-2">Test</td>
      <td class="py-2 text-right text-gray-900 dark:text-white">Weight</td>
      <td class="py-2 text-right text-gray-900 dark:text-white">Grade</td>
      <td class="py-2 text-right text-gray-900 dark:text-white">Total</td>
    </tr>
    <tbody class="divide-y divide-gray-300 dark:divide-gray-700">
      <tr v-for="exam in grades.exams" :key="exam.id">
        <td class="py-2">
          <router-link
            :to="`/courses/${grades.courseSlug}/${exam.slug}`"
            class="inline-flex items-center"
          >
            <DocumentTextIcon class="mr-1 w-5 h-5 fill-current" />
            {{ exam.label }}
          </router-link>
        </td>
        <td class="py-2 text-right text-gray-600 dark:text-gray-400">
          {{ exam.weightPercentage }}%
        </td>
        <td class="py-2 text-right text-gray-900 dark:text-white">
          {{ exam.grade }}
        </td>
        <td class="py-2 text-right text-gray-600 dark:text-gray-400">
          {{ Math.floor(exam.grade * exam.weight) }}%
        </td>
      </tr>
    </tbody>
    <tr class="border-t border-gray-300 dark:border-gray-700">
      <td class="py-2 w-3 font-semibold">
        Total
        <div class="hidden text-sm font-normal text-gray-500 sm:block">
          Weighted mean of grades
        </div>
      </td>
      <td class="py-2 w-3" />
      <td class="py-2 w-3" />
      <td
        class="
          py-2
          w-3
          text-xl
          font-semibold
          tracking-wide
          text-right text-gray-900
          dark:text-white
        "
      >
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
