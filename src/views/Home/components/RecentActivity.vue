<template>
  <div v-if="recentActivities.length">
    <AppLabel class="pb-2 label-border" emphasis>Recent Activity</AppLabel>
    <div class="mt-4 overflow-hidden rounded-lg shadow separator-y">
      <ActivityRow
        v-for="(event, i) of recentActivities"
        :key="i"
        :event="event"
        :avatarUrl="getAvatarUrl(event.subjectId)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActivityRow from '@/components/ActivityRow.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import userMixin from '@/mixins/user'
import { AppEvent } from '@/types'

export default defineComponent({
  name: 'RecentActivites',
  components: { AppLabel, ActivityRow },
  mixins: [userMixin],
  computed: {
    recentActivities (): AppEvent[] {
      if (!this.user) {
        return []
      }
      return this.user.role === 'admin'
        ? this.$store.getters.recentAttemptEvents()
        : this.$store.getters.recentAttemptEvents(this.user.id)
    }
  },
  methods: {
    getAvatarUrl (userId: string): string | undefined {
      return this.$store.getters.avatarUrlByUser(userId)
    }
  }
})
</script>
