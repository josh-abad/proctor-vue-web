<template>
  <button
    class="focus:outline-none"
    :class="{ 'cursor-default pointer-events-none': staticCheck }"
    @click="handleToggle"
  >
    <div
      class="box-border w-5 h-5 border-2 border-gray-400 rounded dark:border-gray-600"
      :class="{ 'border-green-500 dark:border-green-500': modelValue }"
    >
      <CheckIcon
        class="w-4 h-4 text-green-500 stroke-current stroke-2"
        v-show="modelValue"
      />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'SVGCheckbox',
  components: { CheckIcon },
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
    handleToggle () {
      if (!this.staticCheck) {
        this.$emit('update:modelValue', !this.modelValue)
      }
    }
  }
})
</script>
