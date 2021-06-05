<template>
  <div class="user-page">
    <AppPanel class="user-page__header">
      <div class="user-page__user">
        <UserCircleIcon class="w-20 h-20 text-gray-400 dark:text-gray-600" />
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
          {{ user?.courses.length !== 1 ? 'Courses' : 'Course' }}
        </UserPageStat>
      </div>
    </AppPanel>
    <AppPanel class="user-page__content">
      <h3 class="user-page__activity-header">Activity</h3>
      <ActivityList
        :activities="userEvents.slice(0, 5)"
        :is-loading="loadingUserEvents"
        :has-error="errorUserEvents"
      />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UserPageStat from '@/components/UserPageStat.vue'
import usersService from '@/services/users'
import useFetch from '@/composables/use-fetch'
import { UserCircleIcon } from '@heroicons/vue/solid'
import ActivityList from '@/components/ActivityList.vue'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UserPage',
  components: {
    AppPanel,
    UserPageStat,
    UserCircleIcon,
    ActivityList
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [user, fetchUser, loadingUser, errorUser] = useFetch<User | null>(
      () => usersService.getUser(props.userId)
    )
    const [userEvents, fetchUserEvents, loadingUserEvents, errorUserEvents] =
      useFetch(() => usersService.getRecentActivity(props.userId), [])

    fetchUser().then(() => {
      fetchUserEvents()
    })

    return {
      user,
      userEvents,
      loadingUser,
      loadingUserEvents,
      errorUser,
      errorUserEvents
    }
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
</style>
