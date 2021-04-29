<template>
  <div class="flex flex-col p-4 sm:flex-row">
    <AppPanel class="flex-grow w-full space-y-8 sm:w-96">
      <RecentCourses />
      <CourseList />
      <RecentActivity class="hidden sm:block" :user-id="user?.id ?? ''" />
    </AppPanel>
    <div class="w-full mt-4 ml-0 sm:w-72 sm:ml-4 sm:mt-0">
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
import userMixin from '@/mixins/user'

export default defineComponent({
  name: 'Home',
  components: {
    RecentCourses,
    Timeline,
    RecentActivity,
    CourseList,
    AppPanel
  },
  mixins: [userMixin]
})
</script>
