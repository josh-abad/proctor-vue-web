<template>
  <div class="user-page">
    <AppPanel class="user-page__header">
      <div class="user-page__user">
        <img :src="user?.avatarUrl" alt="Avatar" class="user-page__avatar" />
        <div class="user-page__info">
          <div class="user-page__name">
            {{ user?.fullName }}
          </div>
          <div class="user-page__role">
            {{ user?.role }}
          </div>
        </div>
      </div>
      <div class="user-page__stats">
        <UserPageStat :count="user?.courses.length ?? 0">
          {{ user?.courses.length !== 1 ? "Courses" : "Course" }}
        </UserPageStat>
        <UserPageStat :count="completedCourses"> Completed </UserPageStat>
      </div>
    </AppPanel>
    <AppPanel class="user-page__content">
      <h3 class="user-page__activity-header">Activity</h3>
      <div class="user-page__activities separator-y">
        <ActivityRow
          :key="i"
          v-for="(event, i) in userEvents.slice(0, 10)"
          :event="event"
        />
      </div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { AppEvent, User } from '@/types'
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ActivityRow from '@/components/ActivityRow.vue'
import UserPageStat from '@/components/UserPageStat.vue'
import usersService from '@/services/users'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UserPage',
  components: { AppPanel, ActivityRow, UserPageStat },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const userEvents = ref([] as AppEvent[])
    const getUserEvents = async () => {
      userEvents.value = await usersService.getRecentActivity(props.userId)
    }

    return {
      userEvents,
      getUserEvents
    }
  },
  computed: {
    user (): User | undefined {
      return this.$store.getters.userByID(this.userId)
    },
    completedCourses (): number {
      const reducer = (a: number, courseId: string): number => {
        return a + (this.$store.getters.courseCompletedPercentage(courseId, this.userId) === 100 ? 1 : 0)
      }
      return this.user
        ? this.user.courses.reduce(reducer, 0)
        : 0
    }
  },
  async created () {
    await this.getUserEvents()
  }
})
</script>

<style lang="postcss" scoped>
.user-page {
  @apply p-6;
}

.user-page__header {
  @apply rounded-b-none border-b-0 flex justify-between items-start;
}

.user-page__content {
  @apply rounded-t-none border-t-0 pt-0;
}

.user-page__stats {
  @apply divide-x divide-gray-300 dark:divide-gray-700 mt-3 hidden sm:flex;
}

.user-page__avatar {
  @apply w-20 h-20 object-cover rounded-full;
}

.user-page__user {
  @apply flex items-center space-x-4;
}

.user-page__info {
  @apply flex flex-col items-start space-y-2;
}

.user-page__name {
  @apply text-2xl font-semibold;
}

.user-page__role {
  @apply px-3 py-1 uppercase text-xs font-semibold tracking-widest border border-green-500 text-green-500 rounded-full;
}

.user-page__activity-header {
  @apply text-xl font-semibold;
}

.user-page__activities {
  @apply mt-2 rounded-lg overflow-hidden shadow-lg;
}
</style>
