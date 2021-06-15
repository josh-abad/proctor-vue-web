<template>
  <ol class="grid grid-cols-7">
    <li v-for="weekday in weekdays" :key="weekday">
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
    weekdays() {
      return WEEKDAYS
    }
  }
})
</script>

<style lang="postcss" scoped>
li {
  @apply py-2 text-xs font-semibold tracking-wider text-center text-gray-400 uppercase select-none;
}
</style>
