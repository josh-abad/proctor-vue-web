<template>
  <div
    class="capitalize text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLabel'
})
</script>
