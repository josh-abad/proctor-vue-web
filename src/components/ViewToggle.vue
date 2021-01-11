<template>
  <button
    @click="$emit('update:modelValue', value)"
    class="focus:outline-none rounded"
    :class="modelValue === value ? 'text-green-500' : 'text-gray-500'"
    title="Card"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewToggle',
  props: {
    value: {
      type: String,
      required: true
    },

    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
})
</script>
