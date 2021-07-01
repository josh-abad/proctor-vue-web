<template>
  <textarea
    v-model="value"
    class="
      py-2
      px-3
      bg-gray-100
      rounded-lg
      border-gray-300
      shadow
      appearance-none
      resize-none
      dark:bg-gray-800
      dark:border-gray-700
      focus:border-indigo-600
      focus:ring-0
      focus:outline-none
      dark:focus:border-indigo-400
    "
  ></textarea>
</template>

<script lang="ts">
import useModelWrapper from '@/composables/use-model-wrapper'
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
  setup(props, { emit }) {
    const value = useModelWrapper(props, emit)

    return {
      value
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
