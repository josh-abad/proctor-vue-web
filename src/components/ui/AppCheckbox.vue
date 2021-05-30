<template>
  <div class="flex items-center">
    <button
      :id="value"
      class="focus:outline-none"
      @click="handleClick"
    >
      <div
        class="box-border w-5 h-5 border-2 border-gray-400 rounded dark:border-gray-600"
        :class="{ 'bg-green-500 border-green-500 dark:border-green-500': isSelected }"
      >
        <CheckIcon
          class="w-4 h-4 text-green-200 stroke-current stroke-2"
          v-show="isSelected"
        />
      </div>
    </button> 
    <label :for="value" class="ml-3">{{ value }}</label>
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
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isSelected (): boolean {
      if (typeof this.modelValue === 'boolean') {
        return this.modelValue
      }
      return this.modelValue.includes(this.value)
    }
  },
  methods: {
    handleClick () {
      if (typeof this.modelValue === 'boolean') {
        this.$emit('update:modelValue', !this.modelValue)
      } else {
        this.$emit('update:modelValue', this.isSelected
          ? this.modelValue.filter(value => value !== this.value)
          : [...this.modelValue, this.value]
        )
      }
    }
  }
})
</script>
