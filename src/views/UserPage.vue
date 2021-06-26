<template>
  <div class="p-6">
    <AppPanel>
      <FadeTransition>
        <div v-if="errorUser">Something went wrong.</div>
        <div v-else-if="loadingUser" class="flex items-start justify-between">
          <div class="flex items-center space-x-4">
            <UserCircleIcon
              class="w-20 h-20 text-gray-400 dark:text-gray-600"
            />
            <div class="flex flex-col items-start space-y-2">
              <div class="text-2xl font-semibold">
                <AppSkeleton class="h-5 w-60" />
              </div>
              <AppSkeleton class="w-20 h-6 rounded-full" />
            </div>
          </div>
        </div>
        <div v-else-if="user" class="flex items-start justify-between">
          <div class="flex items-center space-x-4">
            <Avatar :user="user" class="w-20 h-20 text-2xl" />
            <div class="flex flex-col items-start space-y-2">
              <div class="text-2xl font-semibold">
                {{ user.fullName }}
              </div>
              <div
                class="
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  tracking-widest
                  text-green-500
                  uppercase
                  border border-green-500
                  rounded-full
                "
              >
                {{ user.role }}
              </div>
            </div>
          </div>
          <div
            class="
              hidden
              mt-3
              divide-x divide-gray-300
              dark:divide-gray-700
              sm:flex
            "
          >
            <UserPageStat :count="user.courses.length ?? 0">
              {{ user.courses.length !== 1 ? 'Courses' : 'Course' }}
            </UserPageStat>
          </div>
        </div>
      </FadeTransition>
      <div class="mt-7">
        <h3 class="text-xl font-semibold">Activity</h3>
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
import Avatar from '@/components/Avatar.vue'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UserPage',
  components: {
    AppPanel,
    UserPageStat,
    UserCircleIcon,
    ActivityList,
    AppSkeleton,
    Avatar,
    FadeTransition
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
