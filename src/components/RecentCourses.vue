<template>
  <div v-if="recentCourses.length">
    <BaseLabel class="pb-2 border-b border-gray-700" emphasis
      >Recent Courses</BaseLabel
    >
    <div class="mt-4 flex space-x-4">
      <CoursesPageCard
        :course="course"
        :key="course.id"
        v-for="course in recentCourses.splice(0, 2)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from '@/components/BaseLabel.vue'

export default defineComponent({
  name: 'RecentCourses',
  components: { CoursesPageCard, BaseLabel },
  computed: {
    recentCourses (): Course[] {
      return this.$store.getters.recentCourses
    }
  }
})
</script>
