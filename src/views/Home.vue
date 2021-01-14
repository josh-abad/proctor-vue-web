<template>
  <div>
    <BasePanel>
      <div class="text-3xl font-bold text-gray-900 dark:text-white">Home</div>
      <div class="mt-8">
        <BaseLabel
          class="pb-2 border-b border-gray-300 dark:border-gray-700"
          emphasis
        >
          Shortcuts</BaseLabel
        >
        <div class="mt-4 flex space-x-4">
          <ShortcutCard :icon="icon4" :url="`/user/${user.id}`" v-if="user"
            >Profile</ShortcutCard
          >
          <ShortcutCard
            :icon="icon1"
            url="/students"
            v-if="hasPermission(['coordinator', 'admin'])"
            >Students</ShortcutCard
          >
          <ShortcutCard :icon="icon2" url="/courses">Courses</ShortcutCard>
          <ShortcutCard :icon="icon3" url="/settings">Settings</ShortcutCard>
        </div>
      </div>
      <div class="mt-8" v-if="$store.state.user && !$store.state.user.verified">
        You are not yet verified
      </div>
      <div class="mt-8" v-if="$store.state.courses.recentCourses.length">
        <RecentCourses />
      </div>
      <div class="mt-8" v-if="recentActivities.length">
        <BaseLabel
          class="pb-2 border-b border-gray-300 dark:border-gray-700"
          emphasis
          >Recent Activity</BaseLabel
        >
        <div
          class="mt-4 divide-y divide-gray-300 dark:divide-gray-700 rounded overflow-hidden"
          v-if="user"
        >
          <ActivityRow
            v-for="attempt of recentActivities"
            :key="attempt.id"
            :attempt="attempt"
          />
        </div>
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecentCourses from '@/components/RecentCourses.vue'
import ShortcutCard from '@/components/ShortcutCard.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import roleMixin from '@/mixins/role'
import ActivityRow from '@/components/ActivityRow.vue'
import { Attempt, User } from '@/types'

export default defineComponent({
  name: 'Home',
  components: { RecentCourses, ShortcutCard, BaseLabel, BasePanel, ActivityRow },
  mixins: [roleMixin],
  data () {
    return {
      icon1: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
      icon2: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
      icon3: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      icon4: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    }
  },
  computed: {
    user (): User {
      return this.$store.state.user
    },
    recentActivities (): Attempt[] {
      if (!this.user) {
        return []
      }
      return this.user.role === 'admin' ? this.$store.getters.recentActivities() : this.$store.getters.recentActivities(this.user.id)
    }
  }
})
</script>
