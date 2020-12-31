<template>
  <div>
    <div
      v-if="course.weeks"
      class="flex flex-col space-y-4 divide-y divide-gray-300 dark:divide-gray-700"
    >
      <div v-for="week in course.weeks" :key="week" :id="`week-${week}`">
        <BaseLabel class="mt-4 mb-2"> Week {{ week }} </BaseLabel>
        <div
          class="text-base font-normal flex items-center"
          v-for="exam in exams.filter((exam) => exam.week === week)"
          :key="exam.id"
        >
          <svg
            v-if="$store.getters.examTaken(exam.id)"
            class="stroke-current text-green-500 w-6 h-6"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <svg
            v-else
            class="stroke-current text-gray-400 dark:text-gray-600 w-6 h-6"
            viewBox="0 0 24 24"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
          <router-link
            :to="`/courses/${courseId}/exams/${exam.id}`"
            class="ml-2 text-lg"
            >{{ exam.label }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Course, Exam } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'

export default defineComponent({
  components: { BaseLabel },
  name: 'CourseOverview',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    exams (): Exam[] {
      return this.$store.getters.getExamsByCourse(this.courseId)
    }
  }
})
</script>
