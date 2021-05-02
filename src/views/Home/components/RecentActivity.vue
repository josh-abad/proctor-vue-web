<template>
  <div v-if="recentActivities.length">
    <AppLabel class="pb-2 label-border" emphasis>Recent Activity</AppLabel>
    <div class="mt-4 overflow-hidden rounded-lg shadow separator-y">
      <ActivityRow
        v-for="(event, i) of recentActivities.slice(0, 5)"
        :key="i"
        :event="event"
        :avatarUrl="getAvatarUrl(event.subjectId)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ActivityRow from '@/components/ActivityRow.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import usersService from '@/services/users'
import { AppEvent } from '@/types'
import { useStore } from '@/store'

export default defineComponent({
  name: 'RecentActivites',
  components: { AppLabel, ActivityRow },
  setup () {
    const store = useStore()

    const recentActivities = ref([] as AppEvent[])
    const getRecentActivity = async () => {
      if (!store.state.user) {
        return
      }
      recentActivities.value = await usersService.getRecentActivity(store.state.user.id)
    }

    return {
      recentActivities,
      getRecentActivity
    }
  },
  async created () {
    this.getRecentActivity()
  },
  methods: {
    getAvatarUrl (userId: string): string | undefined {
      return this.$store.getters.avatarUrlByUser(userId)
    }
  }
})
</script>
