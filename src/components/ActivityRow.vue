<template>
  <div>
    <div
      v-if="attempt.exam && attempt.exam.course && user"
      class="text-gray-600 dark:text-gray-400 bg-gray-300 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 text-sm"
    >
      <div class="px-3 py-2 flex justify-between">
        <div class="flex items-center space-x-1">
          <img
            v-if="!hideAvatar"
            :src="user.avatarUrl"
            alt="Avatar"
            class="mr-2 w-5 h-5 object-cover rounded-full"
          />
          <router-link
            :to="`/user/${attempt.user}`"
            class="text-green-800 dark:text-gray-300"
            >{{ myAccount ? "You" : user.name.first }}</router-link
          >
          <span>{{
            attempt.status === "completed" ? "completed" : "started"
          }}</span>
          <router-link
            class="text-gray-900 dark:text-white"
            :to="`/courses/${attempt.exam.course.id}/exams/${attempt.exam.id}`"
            >{{ attempt.exam.label }}</router-link
          >
          <span>in</span>
          <router-link
            :to="`/courses/${attempt.exam.course.id}`"
            class="text-green-800 dark:text-gray-300"
            >{{ attempt.exam.course.name }}</router-link
          >
        </div>
        <div>
          {{
            formattedDate(
              attempt.status === "completed"
                ? attempt.submittedDate
                : attempt.startDate
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt, User } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'ActivityRow',
  props: {
    attempt: {
      type: Object as () => Attempt,
      required: true
    },

    hideAvatar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user (): User | undefined {
      return this.$store.getters.userByID(this.attempt.user)
    },
    myAccount (): boolean {
      return this.user && this.$store.state.user ? this.$store.state.user.id === this.user.id : false
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      return dayjs(d).fromNow()
    }
  }
})
</script>
