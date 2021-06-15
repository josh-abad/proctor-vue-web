<template>
  <div class="flex mt-3">
    <div
      class="flex items-center justify-center w-6 h-6 mt-4 bg-gray-700 rounded"
    >
      {{ questionNumber }}
    </div>
    <div class="py-3 pl-4 select-none">
      {{ examItem.question }}
      <div class="mt-4">
        <div v-if="typeof answer === 'string'">
          <AppInput
            v-if="examItem.questionType === 'text'"
            v-model="answer"
            type="text"
          />
          <div
            v-else-if="examItem.questionType === 'multiple choice'"
            class="space-y-2"
          >
            <RadioButton
              v-for="(choice, i) in choices"
              :key="i"
              :value="choice"
              v-model="answer"
            />
          </div>
        </div>
        <div v-else class="space-y-2">
          <AppCheckbox
            v-for="(choice, i) in choices"
            :key="i"
            :value="choice"
            v-model="answer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Answer, ExamItem } from '@/types'
import { shuffle } from '@/utils/helper'
import { defineComponent, PropType } from 'vue'
import AppCheckbox from './ui/AppCheckbox.vue'
import AppInput from './ui/AppInput.vue'
import RadioButton from './ui/RadioButton.vue'

export default defineComponent({
  name: 'BaseExamItem',
  components: { AppInput, RadioButton, AppCheckbox },
  props: {
    examItem: {
      type: Object as PropType<ExamItem>,
      required: true
    },

    modelValue: {
      type: Array as PropType<Answer[]>,
      default: () => []
    },

    questionNumber: Number
  },
  emits: ['update:modelValue'],
  data() {
    let answer: string | string[]
    if (this.examItem.questionType !== 'multiple answers') {
      answer = ''
    } else {
      answer = []
    }
    return {
      answer
    }
  },
  watch: {
    answer(newAnswer: string | string[]) {
      // FIXME: duplicate questions don't get counted
      if (
        this.modelValue.some(
          ({ question }) => question === this.examItem.question
        )
      ) {
        this.$emit(
          'update:modelValue',
          this.modelValue.map(item =>
            item.question === this.examItem.question
              ? {
                  question: item.question,
                  answer: newAnswer
                }
              : item
          )
        )
      } else {
        this.$emit('update:modelValue', [
          ...this.modelValue,
          {
            question: this.examItem.question,
            answer: newAnswer
          }
        ])
      }
    }
  },
  computed: {
    choices(): string[] {
      if (this.examItem.shuffleChoices) {
        return shuffle([...this.examItem.choices])
      }
      return this.examItem.choices
    }
  }
})
</script>
