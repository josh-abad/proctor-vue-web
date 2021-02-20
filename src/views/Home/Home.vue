<template>
  <div class="p-4 flex items-start">
    <AppPanel class="flex-grow space-y-8">
      <RecentCourses />
      <CourseList :courses="courses" />
      <RecentActivity />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from './components/RecentCourses.vue'
import Timeline from './components/Timeline/Timeline.vue'
import RecentActivity from './components/RecentActivity.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import CourseList from '@/components/CourseList/CourseList.vue'
import { Course } from '@/types'

export default defineComponent({
  name: 'Home',
  components: {
    RecentCourses,
    Timeline,
    RecentActivity,
    CourseList,
    AppPanel
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    }
  }
})
</script>
