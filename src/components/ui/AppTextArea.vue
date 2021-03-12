<template>
  <textarea
    class="px-3 py-2 bg-gray-100 border-gray-300 rounded-lg shadow appearance-none resize-none focus:outline-none dark:bg-gray-800 focus:ring-0 dark:border-gray-700 focus:border-green-500"
    name=""
    id=""
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppTextArea',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['update:modelValue']
})
</script>
