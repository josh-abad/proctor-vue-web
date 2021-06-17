<template>
  <label
    class="inline-flex items-center space-x-3 opacity-100 cursor-pointer"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <span class="relative">
      <span class="track" :class="{ active: modelValue }" />
      <span class="thumb" :class="{ 'transform translate-x-full': modelValue }">
        <input
          @change="handleChange"
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
  emits: ['update:modelValue'],
  methods: {
    handleChange($event: Event) {
      if ($event.target instanceof HTMLInputElement) {
        this.$emit('update:modelValue', $event.target.checked)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.track {
  @apply block w-10 h-6 bg-gray-400 rounded-full shadow-inner  dark:bg-gray-600;
}

.track.active {
  @apply bg-green-500 dark:bg-green-500;
}

.thumb {
  @apply absolute inset-y-0 left-0 block w-4 h-4 mt-1 ml-1 transition-transform duration-300 ease-in-out bg-white rounded-full shadow-lg;
}
</style>
