<template>
  <div>
    <ViewToggle
      value="text"
      :model-value="modelValue"
      @update:model-value="handleUpdate"
      class="toggle"
      :class="{ 'toggle-selected': modelValue === 'text' }"
      >Text</ViewToggle
    >
    <ViewToggle
      value="multiple choice"
      :model-value="modelValue"
      @update:model-value="handleUpdate"
      class="toggle"
      :class="{ 'toggle-selected': modelValue === 'multiple choice' }"
      >Multiple Choice</ViewToggle
    >
    <ViewToggle
      value="multiple answers"
      :model-value="modelValue"
      @update:model-value="handleUpdate"
      class="toggle"
      :class="{ 'toggle-selected': modelValue === 'multiple answers' }"
      >Checkbox</ViewToggle
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ViewToggle from '@/components/ViewToggle.vue'

export default defineComponent({
  name: 'QuestionTypeInput',
  components: { ViewToggle },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleUpdate (newValue: string): void {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>

<style lang="postcss" scoped>
.toggle {
  @apply text-sm px-2 hover:text-green-400;
}

.toggle-selected {
  @apply font-semibold text-green-400 bg-green-600 bg-opacity-40 rounded;
}
</style>
