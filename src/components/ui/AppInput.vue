<template>
  <input
    class="shadow focus:outline-none bg-gray-100 dark:bg-gray-800 appearance-none rounded-lg px-3 py-2 focus:ring-0 border-gray-300 dark:border-gray-700 focus:border-green-500"
    :class="{ 'focus:border-red-500 border-red-500': error }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppInput',
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
