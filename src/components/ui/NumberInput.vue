<template>
  <div class="flex justify-center items-center">
    <input
      ref="input"
      type="number"
      :value="modelValue"
      @input="handleInput"
      :min="min"
      :max="max"
      v-bind="$attrs"
      class="
        bg-transparent
        rounded-l-lg
        border-r-0 border-gray-300
        focus:border-r-0 focus:border-indigo-600
        focus:ring-0
        peer
        dark:focus:border-indigo-400
        dark:border-white/20
      "
    />
    <div
      class="
        overflow-hidden
        rounded-r-lg
        border border-l-0 border-gray-300
        peer-focus:border-indigo-600
        dark:border-white/20
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
  inheritAttrs: false,
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
  -webkit-appearance: none;
  appearance: none;
}
</style>
