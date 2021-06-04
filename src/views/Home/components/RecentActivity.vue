<template>
  <div>
    <AppLabel class="pb-2 label-border" emphasis>Recent Activity</AppLabel>
    <div v-if="hasError">Could not load recent activity</div>
    <div v-else-if="isLoading" class="separator-y">
      <div class="flex justify-between py-3" v-for="i in 5" :key="i">
        <AppSkeleton class="h-3" :class="i % 2 === 0 ? 'w-52' : 'w-60'" />
        <AppSkeleton class="h-3 w-14" />
      </div>
    </div>
    <div v-else-if="recentActivities.length" class="separator-y">
      <ActivityRow
        v-for="(event, i) of recentActivities.slice(0, 5)"
        :key="i"
        :event="event"
      />
    </div>
    <div v-else>You have no recent activity</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActivityRow from '@/components/ActivityRow.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import userService from '@/services/user'
import useFetch from '@/composables/use-fetch'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'RecentActivites',
  components: { AppLabel, ActivityRow, AppSkeleton },
  setup() {
    const [recentActivities, fetchRecentActivities, isLoading, hasError] =
      useFetch(() => userService.getRecentActivity(), [])

    fetchRecentActivities()

    return {
      recentActivities,
      isLoading,
      hasError
    }
  }
})
</script>
