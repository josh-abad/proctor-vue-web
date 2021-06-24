<template>
  <li class="flex justify-between w-full py-5">
    <div class="flex">
      <div class="mr-6 font-semibold text-gray-400">
        {{ attemptNumber }}
      </div>
      <div class="mr-12">
        <div class="capitalize">
          {{ attempt.status }}
        </div>
        <div class="text-sm text-gray-400">
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
      <div class="text-xl">{{ percentage }}%</div>
      <div class="ml-6 text-xl">
        {{ attempt.score }}/{{ attempt.examTotal }}
      </div>
      <button
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
