<template>
  <div
    class="uppercase text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wide mb-1"
    :class="line ? 'apply pb-1 border-b dark:border-gray-700' : ''"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLabel',
  props: {
    line: Boolean
  }
})
</script>
