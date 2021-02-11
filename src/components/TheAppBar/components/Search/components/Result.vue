<template>
  <li
    id="listbox-item-0"
    role="option"
    class="text-gray-900 dark:text-white cursor-pointer select-none relative py-2 pl-3 pr-9"
    @click="$emit('result-click')"
  >
    <span class="ml-3 block truncate">
      <slot></slot>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Result',
  emits: ['result-click']
})
</script>
