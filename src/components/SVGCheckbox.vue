<template>
  <button
    class="focus:outline-none"
    :class="{ 'cursor-default pointer-events-none': staticCheck }"
    @click="handleToggle"
  >
    <div
      class="box-border w-5 h-5 rounded border-2 border-gray-600"
      :class="{ 'border-green-500': modelValue }"
    >
      <!-- Heroicon name: check -->
      <svg
        class="stroke-current stroke-2 text-green-500 w-4 h-4"
        v-show="modelValue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SVGCheckbox',
  props: {
    staticCheck: {
      type: Boolean,
      default: false
    },

    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleToggle (): void {
      if (!this.staticCheck) {
        this.$emit('update:modelValue', !this.modelValue)
      }
    }
  }
})
</script>
