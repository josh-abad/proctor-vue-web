<template>
  <div class="flex justify-between w-full py-5">
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
          <div v-else>Submitted {{ formattedDate(attempt.submittedDate) }}</div>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mr-6 text-xl font-thin">{{ percentage }}%</div>
      <div class="mr-6 text-xl font-thin">
        {{ attempt.score }}/{{ attempt.examTotal }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'AttemptItem',
  props: {
    attempt: {
      type: Object as PropType<Attempt>,
      required: true
    },

    attemptNumber: Number
  },
  emits: ['review-clicked'],
  computed: {
    percentage (): number {
      return Math.floor(this.attempt.score / this.attempt.examTotal * 100)
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      return dayjs(d).fromNow()
    }
  }
})
</script>
