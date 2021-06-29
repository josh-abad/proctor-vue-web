<template>
  <textarea
    :value="modelValue"
    @input="handleInput"
    class="
      px-3
      py-2
      bg-gray-100
      border-gray-300
      rounded-lg
      shadow
      appearance-none
      resize-none
      focus:outline-none
      dark:bg-gray-800
      focus:ring-0
      dark:border-gray-700
      focus:border-indigo-600
      dark:focus:border-indigo-400
    "
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppTextArea',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput($event: Event) {
      if ($event.target instanceof HTMLTextAreaElement) {
        this.$emit('update:modelValue', $event.target.value)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
textarea::-webkit-scrollbar {
  width: 14px;
}

textarea::-webkit-scrollbar-track {
  @apply bg-transparent;
}

textarea::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
}
</style>
