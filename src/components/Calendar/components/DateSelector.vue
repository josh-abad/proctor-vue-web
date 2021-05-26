<template>
  <div class="flex items-center justify-between cursor-pointer">
    <span @click="selectPrevious">
      <ChevronLeftIcon
        class="w-5 h-5 text-gray-700 stroke-current dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      />
    </span>
    <span
      @click="selectCurrent"
      class="text-sm font-semibold tracking-wider uppercase rounded-full"
      >Today</span
    >
    <span @click="selectNext">
      <ChevronRightIcon
        class="w-5 h-5 text-gray-700 stroke-current dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      />
    </span>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { defineComponent, PropType } from 'vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'DateIndicator',
  components: { ChevronRightIcon, ChevronLeftIcon },
  props: {
    currentDate: {
      type: String,
      required: true
    },

    selectedDate: {
      type: Object as PropType<Dayjs>,
      required: true
    }
  },
  emits: ['date-selected'],
  methods: {
    selectPrevious () {
      const newSelectedDate = dayjs(this.selectedDate).subtract(1, 'month')
      this.$emit('date-selected', newSelectedDate)
    },
    selectCurrent () {
      const newSelectedDate = dayjs(this.currentDate)
      this.$emit('date-selected', newSelectedDate)
    },
    selectNext () {
      const newSelectedDate = dayjs(this.selectedDate).add(1, 'month')
      this.$emit('date-selected', newSelectedDate)
    }
  }
})
</script>
