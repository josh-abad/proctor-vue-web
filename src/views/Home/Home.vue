<template>
  <div class="p-4 flex items-start">
    <BasePanel class="flex-grow">
      <div class="text-3xl font-bold">Home</div>
      <RecentCourses class="mt-8" />
      <RecentActivity class="mt-8" />
    </BasePanel>
    <UpcomingExamsList class="ml-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from './components/RecentCourses.vue'
import UpcomingExamsList from './components/UpcomingExamsList/UpcomingExamsList.vue'
import RecentActivity from './components/RecentActivity.vue'
import BasePanel from '@/components/BasePanel.vue'

export default defineComponent({
  name: 'Home',
  components: { RecentCourses, UpcomingExamsList, RecentActivity, BasePanel }
})
</script>
