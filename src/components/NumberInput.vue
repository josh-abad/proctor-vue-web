<template>
  <div class="flex flex-col items-center">
    <button
      class="rounded-t button-input"
      :class="maxValueReached ? 'cursor-default' : ''"
      @click="handleIncrement"
    >
      <ChevronUpIcon
        class="button-icon"
        :class="maxValueReached ? 'button-disabled' : ''"
      />
    </button>
    <div
      class="px-1 border border-gray-300 rounded-lg shadow dark:border-gray-700"
    >
      <transition name="fade">{{ pad ? paddedValue : value }}</transition>
    </div>
    <button
      class="rounded-b button-input"
      :class="minValueReached ? 'cursor-default' : ''"
      @click="handleDecrement"
    >
      <ChevronDownIcon
        class="button-icon"
        :class="minValueReached ? 'button-disabled' : ''"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'NumberInput',
  components: { ChevronUpIcon, ChevronDownIcon },
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
  @apply fill-current w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white;
}

.button-disabled {
  @apply text-gray-400 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-600;
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
