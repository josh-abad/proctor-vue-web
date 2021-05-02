<template>
  <button
    @click="handleClick"
    class="w-full text-left dropdown-item focus:outline-none"
    :class="{ 'dropdown-item--separator': separator }"
    id="btn-open"
    role="menuitem"
  >
    <div class="flex items-center space-x-2 pointer-events-none">
      <slot name="icon" />
      <span><slot name="label" /></span>
    </div>
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
    },

    separator: {
      type: Boolean,
      default: false
    }
  },
  emits: ['item-click'],
  methods: {
    handleClick () {
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

.dropdown-item--separator {
  @apply border-t border-gray-800 dark:border-gray-100 border-opacity-10 dark:border-opacity-10;
}
</style>
