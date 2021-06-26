<template>
  <div
    class="text-xs font-semibold text-gray-600 dark:text-gray-400"
    :class="emphasis ? 'uppercase tracking-wider' : 'capitalize'"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLabel',
  props: {
    emphasis: {
      type: Boolean,
      default: false
    }
  }
})
</script>
