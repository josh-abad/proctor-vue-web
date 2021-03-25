<template>
  <label
    class="inline-flex items-center mt-3 space-x-3 opacity-100 cursor-pointer"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <span class="relative">
      <span
        class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner dark:bg-gray-600"
        :class="{ 'bg-green-500 dark:bg-green-500': modelValue }"
      />
      <span
        class="absolute inset-y-0 left-0 block w-4 h-4 mt-1 ml-1 transition-transform duration-300 ease-in-out bg-white rounded-full shadow-lg"
        :class="{ 'transform translate-x-full': modelValue }"
      >
        <input
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          :disabled="disabled"
          type="checkbox"
          class="absolute w-0 h-0 opacity-0"
        />
      </span>
    </span>
    <span class="text-sm"><slot /></span>
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

    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue']
})
</script>
