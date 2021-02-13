<template>
  <button
    @click="handleClick"
    class="w-full text-left dropdown-item focus:outline-none"
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
  emits: ['item-click'],
  methods: {
    handleClick (): void {
      this.$emit('item-click')
      if (this.path) {
        this.$router.push(this.path)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-800 dark:hover:bg-gray-100 hover:bg-opacity-10 dark:hover:bg-opacity-10;
}
</style>
