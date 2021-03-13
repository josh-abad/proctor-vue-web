<template>
  <div class="flex items-center justify-between cursor-pointer">
    <span @click="selectPrevious">
      <!-- Heroicon name: chevron-left -->
      <svg
        class="w-5 h-5 text-gray-700 stroke-current dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </span>
    <span
      @click="selectCurrent"
      class="text-sm font-semibold tracking-wider uppercase rounded-full"
      >Today</span
    >
    <span @click="selectNext">
      <!-- Heroicon name: chevron-right -->
      <svg
        class="w-5 h-5 text-gray-700 stroke-current dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateIndicator',
  props: {
    currentDate: {
      type: String,
      required: true
    },

    selectedDate: {
      type: Object as () => Dayjs,
      required: true
    }
  },
  emits: ['date-selected'],
  methods: {
    selectPrevious (): void {
      const newSelectedDate = dayjs(this.selectedDate).subtract(1, 'month')
      this.$emit('date-selected', newSelectedDate)
    },
    selectCurrent (): void {
      const newSelectedDate = dayjs(this.currentDate)
      this.$emit('date-selected', newSelectedDate)
    },
    selectNext (): void {
      const newSelectedDate = dayjs(this.selectedDate).add(1, 'month')
      this.$emit('date-selected', newSelectedDate)
    }
  }
})
</script>
