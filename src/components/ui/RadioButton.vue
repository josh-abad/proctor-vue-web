<template>
  <div class="flex items-center">
    <button
      :aria-labelledby="value"
      :aria-checked="isSelected"
      :tabindex="0"
      role="radio"
      :id="value"
      class="focus:outline-none"
      @click="handleClick"
    >
      <div
        class="
          flex
          justify-center
          items-center
          w-5
          h-5
          bg-gray-300
          rounded-full
          shadow-inner
          dark:bg-gray-700
        "
      >
        <div v-if="isSelected" class="w-3 h-3 bg-indigo-500 rounded-full" />
      </div>
    </button>
    <label :for="value" class="ml-3" v-if="!noLabel">
      <slot>{{ value }}</slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioButton',
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      required: true
    },

    noLabel: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    isSelected(): boolean {
      return this.modelValue === this.value
    }
  },
  methods: {
    handleClick() {
      if (this.readonly) {
        return
      }
      this.$emit('update:modelValue', this.value)
    }
  }
})
</script>
