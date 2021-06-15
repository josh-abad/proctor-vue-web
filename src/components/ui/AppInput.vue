<template>
  <input
    class="bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
    :class="{ error }"
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

<style lang="postcss" scoped>
input {
  @apply px-3 py-2 rounded-lg focus:ring-0 focus:border-green-500;
}

.error {
  @apply focus:border-red-500 border-red-500;
}
</style>
