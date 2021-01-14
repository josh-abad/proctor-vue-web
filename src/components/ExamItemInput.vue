<template>
  <div class="flex mb-4">
    <div class="p-3 text-gray-500 font-thin">
      {{ count }}
    </div>
    <div class="p-3 flex-grow">
      <div>
        <div class="flex items-center justify-between">
          <label for="question">
            <BaseLabel>Question</BaseLabel>
          </label>
          <button
            class="focus:outline-none text-gray-500 dark:hover:text-white mb-1"
            @click="$emit('discard')"
          >
            <!-- Heroicon name: minus-sm -->
            <svg
              class="fill-current w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <BaseInput
          id="question"
          class="w-full"
          v-model="questionValue"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label for="questionType">
          <BaseLabel>Question Type</BaseLabel>
        </label>
        <BaseDropdown
          id="questionType"
          v-model="questionTypeValue"
          :options="questionTypes"
        />
      </div>
      <div class="mt-4" v-if="questionTypeValue === 'text'">
        <label for="answer">
          <BaseLabel>Answer</BaseLabel>
        </label>
        <BaseInput
          id="answer"
          class="w-full"
          v-model="answerValue[0]"
          type="text"
        />
      </div>
      <div class="mt-4" v-else>
        <div
          v-for="(choice, i) in choicesValue"
          :key="i"
          class="flex items-center space-y-2"
        >
          <div>
            <input
              type="radio"
              :value="choice"
              v-model="answerValue[0]"
              v-if="questionTypeValue === 'multiple choice'"
            />
            <input
              type="checkbox"
              :value="choice"
              v-model="answerValue"
              v-else-if="questionTypeValue === 'multiple answers'"
            />
          </div>
          <div class="ml-2">
            <BaseInput type="text" v-model="choicesValue[i]" />
          </div>
        </div>
        <div class="mt-2">
          <BaseButton
            @click="choicesValue.push(`Choice ${choicesValue.length + 1}`)"
            >Add choice</BaseButton
          >
        </div>
      </div>
      {{ choicesValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseDropdown from './BaseDropdown.vue'
import BaseInput from './BaseInput.vue'
import BaseLabel from './BaseLabel.vue'

export default defineComponent({
  components: { BaseInput, BaseLabel, BaseDropdown, BaseButton },
  name: 'ExamItemInput',
  props: {
    question: {
      type: String,
      default: ''
    },

    answer: {
      type: Array as PropType<string[]>,
      required: true
    },

    questionType: {
      type: String,
      default: 'text'
    },

    choices: {
      type: Array as PropType<string[]>,
      required: true
    },

    count: {
      type: Number,
      required: true
    }
  },
  emits: ['update:question', 'update:answer', 'update:questionType', 'update:choices', 'discard'],
  data () {
    return {
      questionValue: '',
      answerValue: [] as string[],
      questionTypeValue: '',
      choicesValue: [] as string[],
      questionTypes: [
        {
          text: 'Text',
          value: 'text'
        },
        {
          text: 'Multiple Choice',
          value: 'multiple choice'
        },
        {
          text: 'Checkbox',
          value: 'multiple answers'
        }
      ]
    }
  },
  watch: {
    questionValue (newValue: string): void {
      this.$emit('update:question', newValue)
    },
    answerValue (newValue: string[]): void {
      this.$emit('update:answer', newValue)
    },
    questionTypeValue (newValue: string): void {
      this.$emit('update:questionType', newValue)
      if (newValue !== 'multiple answers') {
        this.answerValue = ['']
      } else {
        this.answerValue = []
      }
    },
    choicesValue (newValue: string[]): void {
      this.$emit('update:choices', newValue)
    }
  },
  created () {
    this.questionValue = this.question
    this.answerValue = this.answer
    this.questionTypeValue = this.questionType
    this.choicesValue = this.choices
  }
})
</script>
