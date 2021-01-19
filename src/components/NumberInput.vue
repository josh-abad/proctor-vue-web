<template>
  <div class="flex flex-col items-center">
    <button
      class="button-input rounded-t"
      :class="maxValueReached ? 'cursor-default' : ''"
      @click="handleIncrement"
    >
      <!-- Heroicon name: chevron-up -->
      <svg
        class="button-icon"
        :class="maxValueReached ? 'button-disabled' : ''"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div class="rounded-lg shadow px-1 border border-gray-700">
      <transition name="fade">{{ pad ? paddedValue : value }}</transition>
    </div>
    <button
      class="button-input rounded-b"
      :class="minValueReached ? 'cursor-default' : ''"
      @click="handleDecrement"
    >
      <!-- Heroicon name: chevron-down -->
      <svg
        class="button-icon"
        :class="minValueReached ? 'button-disabled' : ''"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberInput',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },

    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },

    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },

    pad: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      value: 0
    }
  },
  computed: {
    paddedValue (): string {
      return this.value.toString().padStart(2, '0')
    },
    maxValueReached (): boolean {
      return !(this.value < this.max)
    },
    minValueReached (): boolean {
      return !(this.value > this.min)
    }
  },
  created () {
    this.value = this.modelValue
  },
  methods: {
    handleIncrement (): void {
      if (!this.maxValueReached) {
        this.$emit('update:modelValue', ++this.value)
      }
    },
    handleDecrement (): void {
      if (!this.minValueReached) {
        this.$emit('update:modelValue', --this.value)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.button-input {
  @apply focus:outline-none px-1;
}

.button-icon {
  @apply fill-current w-5 h-5 text-gray-400 hover:text-white;
}

.button-disabled {
  @apply text-gray-600 hover:text-gray-600;
}

.fade-enter-active {
  @apply ease-out duration-100;
}

.fade-leave-active {
  @apply ease-in duration-75;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-to,
.fade-leave-from {
  @apply opacity-100;
}
</style>
