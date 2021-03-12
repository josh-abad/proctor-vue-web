<template>
  <li
    id="listbox-item-0"
    role="option"
    class="relative py-2 pl-3 text-gray-900 cursor-pointer select-none dark:text-white pr-9"
    @click="$emit('result-click')"
  >
    <span class="block ml-3 truncate">
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
