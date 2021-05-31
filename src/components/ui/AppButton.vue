<template>
  <button
    class="transition-colors duration-300 ease-in-out rounded-lg  focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
    :class="
      prominent
        ? 'text-white bg-green-500 active:bg-green-300'
        : 'bg-gray-300 text-gray-600 active:bg-gray-200 dark:active:bg-gray-500 dark:text-gray-400 dark:bg-gray-700'
    "
  >
    <div class="mx-6 my-2 text-sm font-semibold capitalize pointer-events-none">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    prominent: {
      type: Boolean,
      default: false
    }
  }
})
</script>
