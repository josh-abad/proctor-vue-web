<template>
  <li class="flex items-center">
    <RadioButton
      v-if="type === 'radio'"
      :value="value"
      :model-value="answer[0]"
      @update:modelValue="handleAnswerChange"
      no-label
    />
    <AppCheckbox
      v-else
      :value="value"
      :model-value="answer"
      @update:modelValue="handleAnswerChange"
      no-label
    />
    <AppInput
      type="text"
      :model-value="value"
      @update:modelValue="handleChoiceChange"
      class="ml-2 text-sm"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppInput from './ui/AppInput.vue'
import AppCheckbox from './ui/AppCheckbox.vue'
import RadioButton from './ui/RadioButton.vue'

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
    answer: {
      type: Array as PropType<string[]>,
      required: true
    },
    choices: {
      type: Array as PropType<string[]>,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  emits: ['update:answer', 'update:choices'],
  computed: {
    isSelected(): boolean {
      return this.answer.includes(this.value)
    }
  },
  methods: {
    handleAnswerChange(newAnswer?: string | string[] | boolean) {
      if (typeof newAnswer === 'object') {
        if (this.isSelected) {
          return this.$emit(
            'update:answer',
            this.answer.filter(value => value !== this.value)
          )
        }
        return this.$emit('update:answer', newAnswer)
      } else if (typeof newAnswer === 'string') {
        return this.$emit('update:answer', [newAnswer])
      }
    },
    handleChoiceChange(newChoice?: string | number) {
      if (typeof newChoice === 'string') {
        this.$emit(
          'update:choices',
          this.choices.map((choice, index) => {
            return index === this.position ? newChoice : choice
          })
        )
      }
    }
  }
})
</script>
