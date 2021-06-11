<template>
  <ul class="divide-y divide-gray-300 dark:divide-gray-700">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'List'
})
</script>
