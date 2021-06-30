<template>
  <li
    class="
      relative
      py-2
      pr-9
      pl-3
      text-gray-900
      cursor-pointer
      select-none
      dark:text-white
      hover:bg-gray-100
      dark:hover:bg-gray-600
    "
    role="option"
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
