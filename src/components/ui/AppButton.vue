<template>
  <button
    class="px-6 py-2 text-sm font-semibold capitalize duration-300 ease-in-out rounded-lg shadow appearance-none focus:outline-none disabled:opacity-50"
    :class="
      prominent
        ? 'text-white bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
        : 'bg-gray-200 bg-opacity-5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:bg-opacity-20 dark:hover:bg-opacity-30 hover:shadow-md'
    "
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    prominent: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    },

    type: {
      type: String,
      required: false,
      default: 'button'
    }
  }
})
</script>
