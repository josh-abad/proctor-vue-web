<template>
  <div>
    <div class="bg-white dark:bg-gray-800 shadow rounded-xl px-6 py-6">
      <h1 class="text-lg font-semibold">{{ header}}</h1>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in courses">
          <CourseCard :course="course" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { Course, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard },
  name: 'CoursesPage',
  computed: {
    courses (): Course[] {
      if (this.$store.getters.userRole === 'admin') {
        return this.$store.state.courses
      }
      return this.$store.getters.getUserCourses
    },
    header (): string {
      const userRole: Role = this.$store.getters.userRole
      if (userRole === 'student') {
        return 'Course overview'
      } else if (userRole === 'coordinator') {
        return 'Courses you are coordinator of'
      }
      return 'Martin Coursese'
    }
  }
})
</script>
