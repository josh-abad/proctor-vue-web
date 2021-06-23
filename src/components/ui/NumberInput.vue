<template>
  <div class="flex h-10" id="number-input">
    <input
      ref="input"
      type="number"
      :value="modelValue"
      @input="handleInput"
      :min="min"
      :max="max"
      class="border-gray-300 dark:border-gray-700"
    />
    <div
      class="border-gray-300 buttons dark:border-gray-700"
      :class="{
        focus
      }"
    >
      <button :class="{ disabled: isMax }" @click="handleIncrement">
        <ChevronUpIcon class="w-5 h-5" />
      </button>
      <button :class="{ disabled: isMin }" @click="handleDecrement">
        <ChevronDownIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'NumberInput',
  components: { ChevronUpIcon, ChevronDownIcon },
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
  setup() {
    const focus = ref(false)
    const input = ref<HTMLInputElement | null>()

    onMounted(() => {
      if (input.value) {
        input.value.addEventListener('focus', () => {
          focus.value = true
        })

        input.value.addEventListener('blur', () => {
          focus.value = false
        })
      }
    })

    return {
      input,
      focus
    }
  },
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

<style lang="postcss" scoped>
button {
  @apply focus:outline-none text-indigo-600 dark:text-indigo-400;
}

button,
#number-input div {
  @apply flex items-center justify-center;
}

.buttons {
  @apply flex flex-col h-full overflow-hidden rounded-r-lg border border-l-0;
}

.buttons.focus {
  @apply border-indigo-600 dark:border-indigo-400;
}

button.disabled {
  @apply opacity-50 pointer-events-none;
}

input {
  @apply bg-gray-100 dark:bg-gray-800 border-r-0 rounded-l-lg focus:ring-0 focus:border-r-0;
  @apply focus:border-indigo-600 dark:focus:border-indigo-400;
}

input[type='number']::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
}
</style>
