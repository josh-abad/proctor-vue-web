<template>
  <li class="flex">
    <QuestionNumber>
      {{ questionNumber }}
    </QuestionNumber>
    <div class="pl-4 w-full select-none">
      <div class="flex justify-between items-start">
        <div class="w-3/4 leading-tight text-justify">
          {{ examItem.question }}
        </div>
        <div class="text-sm text-gray-500 flex flex-col items-end">
          <span class="flex items-center">
            <span v-if="score !== undefined">{{ score }}/</span>
            {{ examItem.points }}
            {{ examItem.points === 1 ? 'pt' : 'pts' }}
            <span v-if="score !== undefined" class="ml-2">
              <CheckIcon
                class="w-5 h-5 dark:text-green-400"
                v-if="score === examItem.points"
              />
              <XIcon class="w-5 h-5 dark:text-red-400" v-else />
            </span>
          </span>
        </div>
      </div>
      <div class="mt-4">
        <AppInput
          v-if="examItem.questionType === 'text'"
          v-model="answer[0]"
          type="text"
          :readonly="readonly"
        />
        <ul
          v-else-if="examItem.questionType === 'multiple choice'"
          class="space-y-2"
          role="radiogroup"
        >
          <li v-for="(choice, i) in choices" :key="i">
            <RadioButton
              :value="choice"
              v-model="answer[0]"
              :readonly="readonly"
            >
              {{ String.fromCharCode('a'.charCodeAt(0) + i) }}. {{ choice }}
            </RadioButton>
          </li>
        </ul>
        <AppTextArea
          v-else-if="examItem.questionType === 'essay'"
          class="w-full h-40"
          v-model="answer[0]"
          :readonly="readonly"
        />
        <ul
          v-else
          :aria-labelledby="`question${questionNumber}`"
          class="space-y-2"
          role="group"
        >
          <li v-for="(choice, i) in choices" :key="i">
            <AppCheckbox :value="choice" v-model="answer" :readonly="readonly">
              {{ String.fromCharCode('a'.charCodeAt(0) + i) }}. {{ choice }}
            </AppCheckbox>
          </li>
        </ul>
        <div v-if="hasPlagiarism" class="flex justify-end mt-1">
          <div
            class="text-sm bg-yellow-500/10 text-yellow-400 px-2 rounded-full"
          >
            Plagiarism Detected
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Answer, ExamItem } from '@/types'
import { shuffle } from '@/utils/helper'
import { defineComponent, PropType } from 'vue'
import AppCheckbox from './ui/AppCheckbox.vue'
import AppInput from './ui/AppInput.vue'
import RadioButton from './ui/RadioButton.vue'
import QuestionNumber from './QuestionNumber.vue'
import AppTextArea from './ui/AppTextArea.vue'
import { CheckIcon, XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'BaseExamItem',
  components: {
    AppInput,
    RadioButton,
    AppCheckbox,
    QuestionNumber,
    AppTextArea,
    CheckIcon,
    XIcon
  },
  props: {
    examItem: {
      type: Object as PropType<ExamItem>,
      required: true
    },

    modelValue: {
      type: Array as PropType<Answer[]>,
      default: () => []
    },

    questionNumber: Number,
    readonly: {
      type: Boolean,
      default: false
    },

    score: {
      type: Number,
      required: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      answer: [] as string[]
    }
  },
  watch: {
    answer: {
      handler(newAnswer: string[]) {
        if (
          this.modelValue.some(({ examItem }) => examItem === this.examItem.id)
        ) {
          this.$emit(
            'update:modelValue',
            this.modelValue.map(item =>
              item.examItem === this.examItem.id
                ? {
                    ...item,
                    examItem: item.examItem,
                    answer: newAnswer
                  }
                : item
            )
          )
        } else {
          this.$emit('update:modelValue', [
            ...this.modelValue,
            {
              examItem: this.examItem.id,
              answer: newAnswer
            }
          ])
        }
      },
      deep: true
    }
  },
  created() {
    this.answer =
      this.modelValue.find(answer => {
        return answer.examItem === this.examItem.id
      })?.answer ?? []
  },
  computed: {
    choices(): string[] {
      if (this.examItem.shuffleChoices) {
        return shuffle([...this.examItem.choices])
      }
      return this.examItem.choices
    },
    hasPlagiarism(): boolean {
      return (
        this.modelValue.find(answer => answer.examItem === this.examItem.id)
          ?.hasPlagiarism ?? false
      )
    }
  }
})
</script>
