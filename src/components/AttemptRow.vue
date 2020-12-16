<template>
  <div class="flex px-6 py-5">
    <div class="mr-6 font-semibold dark:text-gray-400">
      {{ attemptNumber }}
    </div>
    <div class="mr-12">
      <div class="capitalize">
        {{ attempt.status }}
      </div>
      <div class="text-sm dark:text-gray-400">
        Started {{ formattedDate }}
      </div>
    </div>
    <div class="font-semibold text-xl">
      {{ '0' }}
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
    formattedDate (): string | undefined {
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
      return new Date(this.attempt.startDate).toLocaleString('en-PH', options)
    }
  }
})
</script>
