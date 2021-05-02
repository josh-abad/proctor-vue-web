<template>
  <div class="table-bg">
    <table>
      <tr class="table-header">
        <td>Test</td>
        <td class="table-data prominent">Weight</td>
        <td class="table-data prominent">Grade</td>
        <td class="table-data prominent">Total</td>
      </tr>
      <tbody>
        <tr v-for="(grade, i) in courseGrades" :key="i">
          <td>
            <router-link
              :to="`/courses/${exams[i]?.course?.id}/exams/${exams[i]?.id}`"
              class="inline-flex items-center"
            >
              <DocumentTextIcon class="w-5 h-5 mr-1 fill-current" />
              {{ exams[i]?.label }}
            </router-link>
          </td>
          <td class="table-data">{{ weightPercentage }}%</td>
          <td class="table-data prominent">{{ grade }}</td>
          <td class="table-data">{{ Math.floor(grade * weight) }}%</td>
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
          {{ courseTotal }}%
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Exam } from '@/types'
import { DocumentTextIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'CourseGrades',
  components: { DocumentTextIcon },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    courseGrades (): number[] {
      return this.$store.state.user ? this.$store.getters.courseGrades(this.courseId, this.$store.state.user.id) : []
    },
    courseTotal (): number {
      return this.$store.state.user ? this.$store.getters.courseTotal(this.courseId, this.$store.state.user.id) : 0
    },
    exams (): Exam[] {
      return this.$store.getters.examsByCourse(this.courseId)
    },
    // TODO: add actual weight per exam
    weight (): number {
      const exams = this.$store.getters.examsByCourse(this.courseId)
      return 1 / exams.length
    },
    weightPercentage (): string {
      return (this.weight * 100).toLocaleString('en-US', { maximumFractionDigits: 1 })
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
