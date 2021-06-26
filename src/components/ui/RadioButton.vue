<template>
  <div class="flex items-center">
    <button :id="value" class="focus:outline-none" @click="handleClick">
      <div
        class="
          flex
          items-center
          justify-center
          w-5
          h-5
          bg-gray-700
          rounded-full
          shadow-inner
        "
      >
        <div v-if="isSelected" class="w-3 h-3 bg-green-500 rounded-full" />
      </div>
    </button>
    <label :for="value" class="ml-3" v-if="!noLabel">{{ value }}</label>
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
      this.$emit('update:modelValue', this.value)
    }
  }
})
</script>
