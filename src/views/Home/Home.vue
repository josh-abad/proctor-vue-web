<template>
  <div class="p-4 flex flex-col sm:flex-row items-start">
    <AppPanel class="flex-grow space-y-8">
      <RecentCourses />
      <CourseList :courses="courses" />
      <RecentActivity />
    </AppPanel>
    <div class="ml-0 mt-4 w-full sm:w-1/3 sm:ml-4 sm:mt-0">
      <Timeline />
    </div>
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
