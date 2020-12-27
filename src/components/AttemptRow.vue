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
    <div
      @mouseover="hover = true"
      @mouseleave="hover = false"
      class="font-thin text-xl"
    >
      {{ grade }}
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default defineComponent({
  name: 'AttemptRow',
  data () {
    return {
      hover: false
    }
  },
  props: {
    attemptNumber: Number,
    attempt: {
      type: Object as () => Attempt,
      required: true
    }
  },
  computed: {
    percentage (): number {
      return Math.floor(this.attempt.score / this.attempt.examTotal * 100)
    },
    grade (): string {
      return this.hover ? `${this.attempt.score}/${this.attempt.examTotal}` : `${this.percentage}%`
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      return dayjs(d).fromNow()
    }
  }
})
</script>
