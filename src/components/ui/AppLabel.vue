<template>
  <div class="app-label" :class="{ 'app-label--emphasized': emphasis }">
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

<style lang="postcss" scoped>
.app-label {
  @apply text-xs text-gray-600 dark:text-gray-400 font-semibold capitalize;
}

.app-label--emphasized {
  @apply uppercase tracking-wider;
}
</style>
