<template>
  <div v-if="course" class="py-4">
    <div class="dark:bg-gray-800 py-3 px-4 rounded-xl">
      <h1 class="text-3xl">{{ course.name }}</h1>
      <p class="pt-2 dark:text-gray-500">Home > Courses > <span class="dark:text-green-500">Code</span></p>
    </div>
    <div v-for="exam in exams" :key="exam.id">
      <router-link :to="`/exams/${exam.id}/attempts`">{{ exam.label }}</router-link>
    </div>
  </div>
  <div v-else class="p-40">
    <p class="text-2xl font-mono uppercase tracking-wider dark:text-gray-200">Course not found</p>
  </div>
</template>

<script lang="ts">
import { ADD_RECENT_COURSE } from '@/store/mutation-types'
import { Course, Exam } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoursePage',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$store.commit(ADD_RECENT_COURSE, this.courseId)
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
