<template>
  <div class="p-4 flex items-start">
    <BasePanel class="flex-grow space-y-8">
      <RecentCourses />
      <CourseList :courses="courses" />
      <RecentActivity />
    </BasePanel>
    <Timeline class="ml-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from './components/RecentCourses.vue'
import Timeline from './components/Timeline/Timeline.vue'
import RecentActivity from './components/RecentActivity.vue'
import BasePanel from '@/components/BasePanel.vue'
import CourseList from '@/components/CourseList/CourseList.vue'
import { Course } from '@/types'

export default defineComponent({
  name: 'Home',
  components: {
    RecentCourses,
    Timeline,
    RecentActivity,
    CourseList,
    BasePanel
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    }
  }
})
</script>
