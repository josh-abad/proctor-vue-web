<template>
  <button
    class="transform ease-in-out duration-150 capitalize focus:outline-none appearance-none active:scale-95 text-sm font-semibold py-2 px-6 rounded-lg disabled:opacity-50 shadow"
    :class="
      prominent
        ? 'text-white bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
        : 'bg-gray-200 bg-opacity-5 text-gray-400 hover:bg-gray-600 hover:bg-opacity-30 hover:shadow-md'
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
  name: 'BaseButton',
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
