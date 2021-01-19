<template>
  <div
    class="text-xs text-gray-400 font-semibold mb-1"
    :class="emphasis ? 'uppercase tracking-wider' : 'capitalize'"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLabel',
  props: {
    emphasis: {
      type: Boolean,
      default: false
    }
  }
})
</script>
