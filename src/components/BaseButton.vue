<template>
  <button
    class="uppercase focus:outline-none text-white text-sm font-semibold tracking-wider py-2 px-4 rounded-full disabled:opacity-50"
    :class="
      filled
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-transparent text-green-500 dark:text-green-500 border border-green-500 hover:bg-green-500 hover:bg-opacity-10'
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
    filled: {
      type: Boolean,
      required: false,
      default: true
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
