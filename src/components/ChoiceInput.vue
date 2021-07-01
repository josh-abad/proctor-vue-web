<template>
  <li class="flex items-center">
    <RadioButton
      v-if="type === 'radio'"
      :value="value"
      v-model="textAnswerInput"
      no-label
    />
    <AppCheckbox v-else :value="value" v-model="answerInput" no-label />
    <AppInput type="text" v-model="valueInput" class="ml-2 text-sm" />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppInput from './ui/AppInput.vue'
import AppCheckbox from './ui/AppCheckbox.vue'
import RadioButton from './ui/RadioButton.vue'
import useModelWrapper from '@/composables/use-model-wrapper'

export default defineComponent({
  name: 'ChoiceInput',
  components: { AppInput, AppCheckbox, RadioButton },
  props: {
    type: {
      type: String as PropType<'radio' | 'checkbox'>,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    textAnswer: {
      type: String,
      default: ''
    },
    answer: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: ['update:textAnswer', 'update:answer', 'update:value'],
  setup(props, { emit }) {
    const answerInput = useModelWrapper(props, emit, 'answer')
    const textAnswerInput = useModelWrapper(props, emit, 'textAnswer')
    const valueInput = useModelWrapper(props, emit, 'value')

    return {
      answerInput,
      textAnswerInput,
      valueInput
    }
  }
})
</script>
