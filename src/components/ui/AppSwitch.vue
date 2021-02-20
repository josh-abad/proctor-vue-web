<template>
  <label :for="label" class="switch" :class="{ 'switch--disabled': disabled }">
    <span class="relative">
      <span
        class="switch__track"
        :class="{ 'switch__track--on': modelValue }"
      />
      <span class="switch__thumb" :class="{ 'switch__thumb--on': modelValue }">
        <input
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          :id="label"
          :disabled="disabled"
          type="checkbox"
          class="switch__input"
        />
      </span>
    </span>
    <span class="switch__label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppSwitch',
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false
    },

    label: {
      type: String,
      required: false,
      default: ''
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue']
})
</script>

<style lang="postcss" scoped>
.switch {
  @apply mt-3 inline-flex items-center opacity-100 cursor-pointer;
}

.switch--disabled {
  @apply opacity-50 cursor-default;
}

.switch--on {
}

.switch__track {
  @apply block w-10 h-6 rounded-full shadow-inner bg-gray-400 dark:bg-gray-600;
}

.switch__track--on {
  @apply bg-green-500 dark:bg-green-500;
}

.switch__thumb {
  @apply absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow-lg inset-y-0 left-0 transition-transform duration-300 ease-in-out;
}

.switch__thumb--on {
  @apply transform translate-x-full;
}

.switch__input {
  @apply absolute opacity-0 w-0 h-0;
}

.switch__label {
  @apply ml-3 text-sm;
}
</style>
