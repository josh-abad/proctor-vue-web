<template>
  <li
    id="listbox-item-0"
    role="option"
    class="text-white cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-green-600"
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
  name: 'NavBarSearchResult',
  emits: ['result-click']
})
</script>
