<template>
  <input
    class="px-3 py-2 bg-gray-100 border-gray-300 rounded-lg shadow appearance-none focus:outline-none dark:bg-gray-800 focus:ring-0 dark:border-gray-700 focus:border-green-500"
    :class="{ 'focus:border-red-500 border-red-500': error }"
    :value="modelValue"
    @input="handleInput"
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
  emits: ['update:modelValue'],
  methods: {
    handleInput ($event: Event) {
      if ($event.target instanceof HTMLInputElement) {
        this.$emit('update:modelValue', $event.target.value)
      }
    }
  }
})
</script>
