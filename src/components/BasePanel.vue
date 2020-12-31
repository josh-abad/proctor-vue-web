<template>
  <div
    class="bg-gray-100 dark:bg-gray-800 shadow p-6 rounded-lg"
    :class="
      vibrancy
        ? 'bg-opacity-50 dark:bg-opacity-75 backdrop-blur border border-gray-300 dark:border-gray-700'
        : ''
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasePanel',
  props: {
    vibrancy: {
      type: Boolean,
      default: false
    }
  }
})
</script>
