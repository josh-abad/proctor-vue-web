<template>
  <button
    @click="handleClick"
    class="
      block
      w-full
      px-4
      py-2
      text-sm text-left text-gray-900
      dark:text-white
      hover:bg-gray-800/5
      dark:hover:bg-gray-100/10
      focus:outline-none
    "
    :class="{
      'border-t border-gray-800/10 dark:border-gray-100/10': separator
    }"
    id="btn-open"
    role="menuitem"
  >
    <div class="flex items-center space-x-4 pointer-events-none">
      <slot name="icon" />
      <span class="font-medium"><slot name="label" /></span>
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
    handleClick() {
      this.$emit('item-click')
      if (this.path) {
        this.$router.push(this.path)
      }
    }
  }
})
</script>
