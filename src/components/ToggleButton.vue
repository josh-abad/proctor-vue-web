<template>
  <label :for="label" class="mt-3 inline-flex items-center" :class="disabled? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer'">
    <span class="relative">
      <span
        class="block w-10 h-6 rounded-full shadow-inner"
        :class="modelValue ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'"
      ></span>
      <span
        class="absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow-lg inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
        :class="modelValue ? 'transform translate-x-full' : ''"
      >
        <input
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          :id="label"
          :disabled="disabled"
          type="checkbox"
          class="absolute opacity-0 w-0 h-0"
        />
      </span>
    </span>
    <span class="ml-3 text-sm">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleButton',
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
