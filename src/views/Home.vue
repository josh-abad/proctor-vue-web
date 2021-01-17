<template>
  <div>
    <BasePanel>
      <div class="text-3xl font-bold">Home</div>
      <AppShortcuts class="mt-8" />
      <RecentCourses class="mt-8" />
      <RecentActivity class="mt-8" />
      <UpcomingExamsList class="mt-8" />
    </BasePanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from '@/components/RecentCourses.vue'
import BasePanel from '@/components/BasePanel.vue'
import userMixin from '@/mixins/user'
import UpcomingExamsList from '@/components/UpcomingExamsList.vue'
import RecentActivity from '@/components/RecentActivity.vue'
import AppShortcuts from '@/components/AppShortcuts.vue'

export default defineComponent({
  name: 'Home',
  components: { RecentCourses, BasePanel, UpcomingExamsList, RecentActivity, AppShortcuts },
  mixins: [userMixin]
})
</script>
