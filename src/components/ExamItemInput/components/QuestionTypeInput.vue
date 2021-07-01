<template>
  <div>
    <ViewToggle
      value="text"
      v-model="value"
      class="px-2 text-sm hover:text-indigo-500"
      :class="{
        'font-semibold text-indigo-500 bg-indigo-300/20 dark:bg-indigo-900/30 rounded':
          modelValue === 'text'
      }"
      >Text</ViewToggle
    >
    <ViewToggle
      value="multiple choice"
      v-model="value"
      class="px-2 text-sm hover:text-indigo-500"
      :class="{
        'font-semibold text-indigo-500 bg-indigo-300/20 dark:bg-indigo-900/30 rounded':
          modelValue === 'multiple choice'
      }"
      >Multiple Choice</ViewToggle
    >
    <ViewToggle
      value="multiple answers"
      v-model="value"
      class="px-2 text-sm hover:text-indigo-500"
      :class="{
        'font-semibold text-indigo-500 bg-indigo-300/20 dark:bg-indigo-900/30 rounded':
          modelValue === 'multiple answers'
      }"
      >Checkbox</ViewToggle
    >
    <ViewToggle
      value="essay"
      v-model="value"
      class="px-2 text-sm hover:text-indigo-500"
      :class="{
        'font-semibold text-indigo-500 bg-indigo-300/20 dark:bg-indigo-900/30 rounded':
          modelValue === 'essay'
      }"
      >Essay</ViewToggle
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ViewToggle from '@/components/ViewToggle.vue'
import { QuestionType } from '@/types'
import useModelWrapper from '@/composables/use-model-wrapper'

export default defineComponent({
  name: 'QuestionTypeInput',
  components: { ViewToggle },
  props: {
    modelValue: {
      type: String as PropType<QuestionType>,
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = useModelWrapper(props, emit)

    return {
      value
    }
  }
})
</script>
