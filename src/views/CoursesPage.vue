<template>
  <div>
    <div class="bg-gray-100 dark:bg-gray-800 shadow rounded-xl px-6 py-6">
      <div>{{ header }}</div>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in courses">
          <CourseCard :course="course" />
        </div>
      </div>
    </div>
    <div v-show="userRole === 'admin'" class="mt-3">
      <BaseButton label="Create New Course" @click="$router.push('/courses/new')" />
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CourseCard from '@/components/CourseCard.vue'
import { Course, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard, BaseButton },
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
        return 'Manage courses'
      }
      return 'All courses'
    },
    userRole (): Role {
      return this.$store.getters.userRole
    }
  }
})
</script>
