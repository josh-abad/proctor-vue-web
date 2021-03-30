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
import userMixin from '@/mixins/user'
import usersService from '@/services/users'
import { AppEvent } from '@/types'

export default defineComponent({
  name: 'RecentActivites',
  components: { AppLabel, ActivityRow },
  mixins: [userMixin],
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const recentActivities = ref([] as AppEvent[])
    const getRecentActivity = async () => {
      recentActivities.value = await usersService.getRecentActivity(props.userId)
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
