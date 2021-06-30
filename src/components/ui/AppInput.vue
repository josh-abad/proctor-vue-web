<template>
  <input
    class="py-2 px-3 bg-gray-100 rounded-lg dark:bg-transparent focus:ring-0"
    :class="
      error
        ? 'focus:border-red-500 border-red-500'
        : 'border-gray-300 dark:border-white/20 focus:border-indigo-600 dark:focus:border-indigo-400'
    "
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
    handleInput($event: Event) {
      if ($event.target instanceof HTMLInputElement) {
        this.$emit('update:modelValue', $event.target.value)
      }
    }
  }
})
</script>
