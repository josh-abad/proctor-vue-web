<template>
  <router-link v-if="path" :to="path" class="dropdown-item" role="menuitem">
    <slot />
  </router-link>
  <button
    v-else
    @click="$emit('item-click')"
    class="dropdown-item w-full text-left focus:outline-none"
    role="menuitem"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuDropdownItem',
  props: {
    path: {
      type: String,
      required: false
    }
  },
  emits: ['item-click']
})
</script>

<style lang="postcss" scoped>
.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-800 dark:hover:bg-gray-100 hover:bg-opacity-10 dark:hover:bg-opacity-10;
}
</style>
