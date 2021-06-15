<template>
  <div class="user-page">
    <AppPanel>
      <transition name="fade" mode="out-in">
        <div v-if="errorUser">Something went wrong.</div>
        <div v-else-if="loadingUser" class="user-page__header">
          <div class="user-page__user">
            <UserCircleIcon
              class="w-20 h-20 text-gray-400 dark:text-gray-600"
            />
            <div class="user-page__info">
              <div class="user-page__name">
                <AppSkeleton class="h-5 w-60" />
              </div>
              <AppSkeleton class="w-20 h-6 rounded-full" />
            </div>
          </div>
        </div>
        <div v-else-if="user" class="user-page__header">
          <div class="user-page__user">
            <UserCircleIcon
              class="w-20 h-20 text-gray-400 dark:text-gray-600"
            />
            <div class="user-page__info">
              <div class="user-page__name">
                {{ user.fullName }}
              </div>
              <div class="user-page__role">
                {{ user.role }}
              </div>
            </div>
          </div>
          <div class="user-page__stats">
            <UserPageStat :count="user.courses.length ?? 0">
              {{ user.courses.length !== 1 ? 'Courses' : 'Course' }}
            </UserPageStat>
          </div>
        </div>
      </transition>
      <div class="user-page__content">
        <h3 class="user-page__activity-header">Activity</h3>
        <ActivityList
          :attempts="attempts"
          :is-loading="loadingAttempts"
          :has-error="errorAttempts"
        />
      </div>
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
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import NProgress from 'nprogress'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UserPage',
  components: {
    AppPanel,
    UserPageStat,
    UserCircleIcon,
    ActivityList,
    AppSkeleton
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
    const [attempts, fetchAttempts, loadingAttempts, errorAttempts] = useFetch(
      () => usersService.getAttempts(props.userId, 5),
      []
    )

    NProgress.start()
    Promise.all([fetchUser(), fetchAttempts()]).finally(NProgress.done)

    return {
      user,
      attempts,
      loadingUser,
      loadingAttempts,
      errorUser,
      errorAttempts
    }
  }
})
</script>

<style lang="postcss" scoped>
.user-page {
  @apply p-6;
}

.user-page__header {
  @apply flex justify-between items-start;
}

.user-page__content {
  @apply mt-7;
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
