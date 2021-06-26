<template>
  <div class="flex items-center">
    <button :id="value" class="focus:outline-none" @click="handleClick">
      <div
        class="box-border w-5 h-5 border-2 rounded"
        :class="
          isSelected
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-400 dark:border-gray-600'
        "
      >
        <CheckIcon class="w-4 h-4 text-white" v-show="isSelected" />
      </div>
    </button>
    <label :for="value" class="ml-3" v-if="!noLabel">{{ value }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CheckIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'AppCheckbox',
  components: {
    CheckIcon
  },
  props: {
    modelValue: {
      type: [Boolean, Array] as PropType<boolean | string[]>,
      default: false
    },

    value: {
      type: String,
      default: ''
    },

    noLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isSelected(): boolean {
      if (typeof this.modelValue === 'boolean') {
        return this.modelValue
      }
      return this.modelValue.includes(this.value)
    }
  },
  methods: {
    handleClick() {
      if (typeof this.modelValue === 'boolean') {
        this.$emit('update:modelValue', !this.modelValue)
      } else {
        this.$emit(
          'update:modelValue',
          this.isSelected
            ? this.modelValue.filter(value => value !== this.value)
            : [...this.modelValue, this.value]
        )
      }
    }
  }
})
</script>
