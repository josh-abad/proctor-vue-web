<template>
  <div class="flex justify-between items-center cursor-pointer">
    <span @click="selectPrevious">
      <!-- Heroicon name: chevron-left -->
      <svg
        class="stroke-current text-green-300 hover:text-white w-5 h-5"
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
      class="rounded-full uppercase font-semibold tracking-wider text-sm text-white"
      >Today</span
    >
    <span @click="selectNext">
      <!-- Heroicon name: chevron-right -->
      <svg
        class="stroke-current text-green-300 hover:text-white w-5 h-5"
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
