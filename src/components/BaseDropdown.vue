<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="shadow focus:outline-none dark:bg-gray-800 appearance-none rounded py-2 px-3 focus:ring-green-500"
  >
    <option
      :key="i"
      v-for="(option, i) in optionsWithEmpty"
      :value="option.value"
      class="rounded-lg overflow-hidden"
      :disabled="!option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { Option } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseDropdown',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    optionsWithEmpty (): Option[] {
      const emptyOption: Option[] = [
        { text: 'Please select an option', value: '' }
      ]
      return emptyOption.concat(this.options as Option[])
    }
  }
})
</script>
