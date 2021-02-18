<template>
  <ol class="grid grid-cols-7">
    <li
      v-for="weekday in weekdays"
      :key="weekday"
      class="text-center py-2 uppercase tracking-wider text-xs text-gray-400 font-semibold select-none"
    >
      {{ compact ? weekday[0] : weekday }}
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default defineComponent({
  name: 'Weekdays',
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    weekdays () {
      return WEEKDAYS
    }
  }
})
</script>

<style lang="postcss" scoped>
.weekdays--compact {
  @apply dark:bg-dark-01 bg-opacity-50 dark:bg-opacity-75 backdrop-blur;
}
</style>
