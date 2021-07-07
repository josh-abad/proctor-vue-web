<template>
  <li class="flex justify-between w-full py-5">
    <div class="flex">
      <div class="mr-6 font-semibold text-gray-400">
        {{ attemptNumber }}
      </div>
      <div class="mr-12">
        <div class="capitalize">
          {{ attempt.status }}
          <span
            v-if="attempt.pendingGrade"
            title="This exam contains one or more essay questions that have yet to be graded by the course's coordinator."
            class="
              px-2
              py-1
              ml-2
              text-xs
              font-semibold
              tracking-wider
              text-yellow-400
              uppercase
              rounded-full
              bg-yellow-500/20
            "
          >
            full grade pending
          </span>
        </div>
        <div class="hidden text-sm text-gray-400 sm:block">
          <div v-if="attempt.status === 'in-progress'">
            Started {{ formattedDate(attempt.startDate) }}
          </div>
          <div v-else-if="attempt.status === 'completed'">
            Submitted {{ formattedDate(attempt.submittedDate) }}
          </div>
          <div v-else>Expired {{ formattedDate(attempt.endDate) }}</div>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <div class="hidden text-xl sm:block">{{ percentage }}%</div>
      <div class="text-xl sm:ml-6">
        {{ attempt.score }}/{{ attempt.examTotal }}
      </div>
      <router-link
        :to="`${$route.path}${$route.path.endsWith('/') ? '' : '/'}review/${
          attempt.id
        }`"
      >
        <button
          class="
            ml-6
            text-indigo-600
            dark:text-indigo-400
            hover:underline
            focus:outline-none
          "
          v-if="
            isExamClosed || $store.getters.permissions(['coordinator', 'admin'])
          "
        >
          Review
        </button>
      </router-link>
      <button
        :aria-label="`Delete Attempt ${attemptNumber}`"
        @click="deleteAttempt"
        class="ml-6 focus:outline-none"
        v-if="$store.getters.permissions(['coordinator', 'admin'])"
      >
        <XIcon class="w-5 h-5 text-gray-500" />
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent, PropType } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import examAttemptsService from '@/services/exam-attempts'
import NProgress from 'nprogress'
import { isExamLocked } from '@/utils/helper'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'AttemptItem',
  components: { XIcon },
  props: {
    attempt: {
      type: Object as PropType<Attempt>,
      required: true
    },

    attemptNumber: Number
  },
  emits: ['delete'],
  computed: {
    percentage(): number {
      return Math.floor((this.attempt.score / this.attempt.examTotal) * 100)
    },
    isExamClosed(): boolean {
      return isExamLocked(this.attempt.exam) === 1
    }
  },
  methods: {
    formattedDate(d: string | Date) {
      return dayjs(d).fromNow()
    },
    async deleteAttempt() {
      NProgress.start()
      await examAttemptsService.deleteAttempt(this.attempt.id)
      this.$emit('delete', this.attempt.id)
      NProgress.done()
    }
  }
})
</script>
