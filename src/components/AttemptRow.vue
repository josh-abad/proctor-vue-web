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
          <div v-else>
            Submitted {{ formattedDate(attempt.submittedDate) }}
          </div>
        </div>
      </div>
    </div>
    <div class="font-thin text-xl">
      {{ percentage }}%
    </div>
  </div>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AttemptRow',
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
    }
  },
  methods: {
    formattedDate (d: string | Date): string | undefined {
      // TODO: use Intl.DateTimeFormat for better performance

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'PHT',
        hour: '2-digit',
        minute: '2-digit'
      }

      // startDate is already a Date object but Vue complains if I do it directly
      return new Date(d).toLocaleString('en-PH', options)
    }
  }
})
</script>
