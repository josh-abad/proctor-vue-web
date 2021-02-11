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
              <!-- Heroicon name: document-text -->
              <svg
                class="mr-1 fill-current w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
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
          Course Total
          <div class="text-gray-500 font-normal text-sm">
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
import userMixin from '@/mixins/user'
import { Exam } from '@/types'

export default defineComponent({
  name: 'CourseGrades',
  mixins: [userMixin],
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    courseGrades (): number[] {
      return this.user ? this.$store.getters.courseGrades(this.courseId, this.user.id) : []
    },
    courseTotal (): number {
      return this.user ? this.$store.getters.courseTotal(this.courseId, this.user.id) : 0
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
  @apply bg-white dark:bg-dark-06 rounded-lg shadow-lg overflow-hidden;
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
  @apply divide-y divide-gray-200 dark:divide-dark-16;
}

.table-header {
  @apply border-b;
}

.table-header,
.table-footer > td {
  @apply w-3 font-semibold;
}

.table-footer {
  @apply border-t bg-white dark:bg-dark-16;
}

.table-header,
.table-footer {
  @apply border-gray-200 dark:border-dark-16;
}

.prominent {
  @apply text-gray-900 dark:text-white;
}

.course-total-value {
  @apply text-xl tracking-wide;
}
</style>
