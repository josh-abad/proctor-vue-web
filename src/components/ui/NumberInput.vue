<template>
  <div class="flex items-center justify-center">
    <input
      ref="input"
      type="number"
      :value="modelValue"
      @input="handleInput"
      :min="min"
      :max="max"
      class="
        bg-gray-100
        border-r-0 border-gray-300
        rounded-l-lg
        focus:border-indigo-600
        dark:focus:border-indigo-400
        dark:bg-gray-800
        focus:ring-0
        focus:border-r-0
        dark:border-gray-700
        peer
      "
    />
    <div
      class="
        overflow-hidden
        bg-gray-100
        border border-l-0 border-gray-300
        rounded-r-lg
        dark:bg-gray-800
        dark:border-gray-700
        peer-focus:border-indigo-600
        dark:peer-focus:border-indigo-400
      "
    >
      <NumberInputButton :disabled="isMax" @click="handleIncrement">
        <ChevronUpIcon class="w-5 h-5" />
      </NumberInputButton>
      <NumberInputButton :disabled="isMin" @click="handleDecrement">
        <ChevronDownIcon class="w-5 h-5" />
      </NumberInputButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/solid'
import NumberInputButton from './NumberInputButton.vue'

export default defineComponent({
  name: 'NumberInput',
  components: { ChevronUpIcon, ChevronDownIcon, NumberInputButton },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: Number.MAX_VALUE
    },

    min: {
      type: Number,
      default: Number.MIN_VALUE
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isMax(): boolean {
      return this.modelValue === this.max
    },
    isMin(): boolean {
      return this.modelValue === this.min
    }
  },
  methods: {
    handleIncrement() {
      this.$emit('update:modelValue', this.modelValue + 1)
    },
    handleDecrement() {
      this.$emit('update:modelValue', this.modelValue - 1)
    },
    handleInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.$emit('update:modelValue', e.target.value)
      }
    }
  }
})
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
}
</style>
