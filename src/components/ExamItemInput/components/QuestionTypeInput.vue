<template>
  <div>
    <ViewToggle
      value="text"
      :model-value="modelValue"
      @update:modelValue="handleUpdate"
      class="text-sm px-2 hover:text-green-500"
      :class="{
        'font-semibold text-green-500 bg-green-300/20 dark:bg-green-900/30 rounded':
          modelValue === 'text'
      }"
      >Text</ViewToggle
    >
    <ViewToggle
      value="multiple choice"
      :model-value="modelValue"
      @update:modelValue="handleUpdate"
      class="text-sm px-2 hover:text-green-500"
      :class="{
        'font-semibold text-green-500 bg-green-300/20 dark:bg-green-900/30 rounded':
          modelValue === 'multiple choice'
      }"
      >Multiple Choice</ViewToggle
    >
    <ViewToggle
      value="multiple answers"
      :model-value="modelValue"
      @update:modelValue="handleUpdate"
      class="text-sm px-2 hover:text-green-500"
      :class="{
        'font-semibold text-green-500 bg-green-300/20 dark:bg-green-900/30 rounded':
          modelValue === 'multiple answers'
      }"
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
    handleUpdate($event: string | undefined) {
      if ($event !== undefined) {
        this.$emit('update:modelValue', $event)
      }
    }
  }
})
</script>
