<template>
  <textarea
    class="shadow focus:outline-none dark:bg-gray-800 appearance-none rounded py-2 px-3 focus:ring-green-500 resize-none"
    name=""
    id=""
    cols="23"
    rows="10"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTextArea',
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
