<template>
  <button
    role="radio"
    :aria-checked="value === modelValue"
    @click="$emit('update:modelValue', value)"
    class="rounded focus:outline-none"
    :class="
      modelValue === value
        ? 'text-green-500'
        : 'text-gray-400 dark:text-gray-600'
    "
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewToggle',
  props: {
    value: {
      type: String,
      required: true
    },

    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    ['update:modelValue'](option: string) {
      return option
    }
  }
})
</script>
