<template>
  <div v-if="recentActivities.length">
    <BaseLabel class="pb-2 border-b border-gray-700" emphasis
      >Recent Activity</BaseLabel
    >
    <div
      class="mt-4 divide-y divide-gray-700 rounded-lg overflow-hidden shadow"
    >
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
import ActivityRow from './ActivityRow.vue'
import BaseLabel from './BaseLabel.vue'
import userMixin from '@/mixins/user'
import { AppEvent } from '@/types'

export default defineComponent({
  name: 'RecentActivites',
  components: { BaseLabel, ActivityRow },
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
