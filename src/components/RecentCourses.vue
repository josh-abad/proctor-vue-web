<template>
  <div v-show="recentCourses.length > 0">
    <div class="bg-white dark:bg-gray-800 shadow rounded-xl px-6 py-6">
      <h1 class="text-lg font-semibold">Recent Courses</h1>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in recentCourses">
          <CourseCard :course="course" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard },
  name: 'RecentCourses',
  computed: {
    recentCourses (): Course[] {
      return this.$store.getters.getRecentCourses
    }
  }
})
</script>
