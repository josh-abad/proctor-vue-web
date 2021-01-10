<template>
  <input
    class="shadow focus:outline-none dark:bg-gray-800 appearance-none rounded-lg px-3 py-2 focus:ring-0 border-gray-300 dark:border-gray-700"
    :class="
      error
        ? 'focus:border-red-500 dark:focus:border-red-500 border-red-500 dark:border-red-500'
        : 'focus:border-green-500 dark:focus:border-green-500'
    "
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
})
</script>
