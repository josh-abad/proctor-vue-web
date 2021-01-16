<template>
  <div v-if="user">
    <BasePanel
      class="bg-gradient-to-b from-green-300 dark:from-green-700 via-teal-100 dark:via-teal-900 to-gray-100 dark:to-gray-800 rounded-b-none"
    >
      <div class="flex justify-between items-start mb-5">
        <div class="flex items-center">
          <img
            :src="user.avatarUrl"
            alt="Avatar"
            class="w-20 h-20 object-cover rounded-full"
          />
          <div class="ml-4 flex flex-col items-start space-y-2">
            <div class="text-2xl font-semibold">
              {{ user.fullName }}
            </div>
            <div
              class="px-3 py-1 uppercase text-xs font-semibold tracking-widest border border-green-500 text-green-500 rounded-full"
            >
              {{ user.role }}
            </div>
          </div>
        </div>
        <div class="flex divide-x divide-green-700 mt-3">
          <UserPageStat :count="user.courses.length" class="px-3"
            >Courses</UserPageStat
          >
          <UserPageStat :count="completedCourses" class="px-3"
            >Completed</UserPageStat
          >
        </div>
        <div v-if="myAccount">
          <router-link
            to="/settings"
            class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <!-- Heroicon name: cog -->
            <svg
              class="fill-current w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
        </div>
      </div>
      <div class="text-xl font-semibold -mb-4">Activity</div>
    </BasePanel>
    <BasePanel class="rounded-t-none pt-0 -mt-2">
      <div
        class="mt-2 divide-y divide-gray-300 dark:divide-gray-700 rounded overflow-hidden"
      >
        <ActivityRow :key="i" v-for="(event, i) in userEvents" :event="event" />
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BasePanel from '@/components/BasePanel.vue'
import { AppEvent, User } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ActivityRow from '@/components/ActivityRow.vue'
import UserPageStat from '@/components/UserPageStat.vue'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'UserPage',
  components: { BasePanel, ActivityRow, UserPageStat },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  computed: {
    myAccount (): boolean {
      return this.$store.state.user && this.$store.state.user.id === this.userId
    },
    user (): User | undefined {
      return this.$store.getters.userByID(this.userId)
    },
    userEvents (): AppEvent[] {
      return this.$store.getters.orderedAttemptEvents(this.userId)
    },
    completedCourses (): number {
      const reducer = (a: number, courseId: string): number => {
        return a + (this.$store.getters.courseCompletedPercentage(courseId, this.userId) === 100 ? 1 : 0)
      }
      return this.user
        ? this.user.courses.reduce(reducer, 0)
        : 0
    }
  }
})
</script>
