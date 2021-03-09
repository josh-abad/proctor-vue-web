<template>
  <div class="p-4 flex flex-col sm:flex-row">
    <AppPanel class="flex-grow space-y-8 w-full sm:w-96">
      <RecentCourses />
      <CourseList />
      <RecentActivity class="hidden sm:block" />
    </AppPanel>
    <div class="ml-0 mt-4 w-full sm:w-72 sm:ml-4 sm:mt-0">
      <Timeline />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from './components/RecentCourses/RecentCourses.vue'
import Timeline from './components/Timeline/Timeline.vue'
import RecentActivity from './components/RecentActivity.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import CourseList from '@/components/CourseList/CourseList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    RecentCourses,
    Timeline,
    RecentActivity,
    CourseList,
    AppPanel
  }
})
</script>
