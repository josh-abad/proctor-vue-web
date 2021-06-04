<template>
  <div
    class="text-white"
    :class="compact ? 'font-semibold' : 'font-bold text-2xl'"
  >
    {{ selectedMonth }}
  </div>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DateIndicator',
  props: {
    selectedDate: {
      type: Object as PropType<Dayjs>,
      required: true
    },

    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedMonth(): string {
      return this.selectedDate.format('MMMM YYYY')
    }
  }
})
</script>
