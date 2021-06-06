<template>
  <div>
    <AppLabel class="pb-2 label-border" emphasis>Recent Activity</AppLabel>
    <ActivityList
      :attempts="attempts"
      :is-loading="isLoading"
      :has-error="hasError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import userService from '@/services/user'
import useFetch from '@/composables/use-fetch'
import ActivityList from '@/components/ActivityList.vue'

export default defineComponent({
  name: 'RecentActivites',
  components: { AppLabel, ActivityList },
  setup() {
    const [attempts, fetchAttempts, isLoading, hasError] = useFetch(
      () => userService.getAttempts(5),
      []
    )

    fetchAttempts()

    return {
      attempts,
      isLoading,
      hasError
    }
  }
})
</script>
