<template>
  <div class="flex px-6 py-5 justify-between w-full">
    <div class="flex">
      <div class="mr-6 font-semibold dark:text-gray-400">
        {{ attemptNumber }}
      </div>
      <div class="mr-12">
        <div class="capitalize">
          {{ attempt.status }}
        </div>
        <div class="text-sm dark:text-gray-400">
          <div v-if="attempt.status === 'in-progress'">
            Started {{ formattedDate(attempt.startDate) }}
          </div>
          <div v-else>Submitted {{ formattedDate(attempt.submittedDate) }}</div>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <div class="font-thin text-xl mr-6">{{ percentage }}%</div>
      <div class="font-thin text-xl mr-6">
        {{ attempt.score }}/{{ attempt.examTotal }}
      </div>
      <button
        class="focus:outline-none"
        @click="$emit('review-clicked')"
        v-show="hasPermission(['coordinator', 'admin'])"
      >
        Review
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import roleMixin from '@/mixins/role'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'AttemptRow',
  mixins: [roleMixin],
  props: {
    attempt: {
      type: Object as () => Attempt,
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
