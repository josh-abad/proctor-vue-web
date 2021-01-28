<template>
  <ol class="grid grid-cols-7 bg-gray-900 bg-opacity-50">
    <li
      v-for="weekday in weekdays"
      :key="weekday"
      class="text-center py-2 uppercase tracking-wider text-xs text-gray-400 font-semibold select-none"
    >
      {{ weekday }}
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default defineComponent({
  name: 'Weekdays',
  computed: {
    weekdays () {
      return WEEKDAYS
    }
  }
})
</script>
