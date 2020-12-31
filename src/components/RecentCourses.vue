<template>
  <div v-show="recentCourses.length > 0">
    <BaseLabel
      class="pb-2 border-b border-gray-300 dark:border-gray-700"
      emphasis
      >Recent Courses</BaseLabel
    >
    <div class="grid grid-cols-3 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
      <div :key="course.id" v-for="course in recentCourses">
        <CourseCard :course="course" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from '@/components/BaseLabel.vue'

export default defineComponent({
  components: { CourseCard, BaseLabel },
  name: 'RecentCourses',
  computed: {
    recentCourses (): Course[] {
      return this.$store.getters.getRecentCourses
    }
  }
})
</script>
