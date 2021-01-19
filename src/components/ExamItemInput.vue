<template>
  <div class="flex">
    <div
      class="flex flex-grow bg-gray-700 bg-opacity-40 rounded-lg shadow overflow-hidden"
    >
      <div class="p-1 bg-gradient-to-b from-teal-400 to-teal-600" />
      <div class="p-4 flex-grow">
        <div>
          <div class="flex items-start">
            <div class="flex-grow">
              <BaseInput
                placeholder="Question"
                class="w-full"
                :model-value="question"
                @update:model-value="
                  (newValue) => $emit('update:question', newValue)
                "
                type="text"
              />
            </div>
            <div class="ml-2">
              <QuestionTypeInput
                :model-value="questionType"
                @update:model-value="
                  (newValue) => $emit('update:questionType', newValue)
                "
              />
            </div>
          </div>
        </div>
        <div class="mt-4"></div>
        <div class="mt-4" v-if="questionType === 'text'">
          <BaseInput
            placeholder="Text answer"
            class="w-1/2 text-sm"
            :model-value="answer[0]"
            @update:model-value="
              (newValue) => $emit('update:answer', [newValue])
            "
            type="text"
          />
        </div>
        <div class="mt-4" v-else>
          <div
            v-for="(choice, i) in choices"
            :key="i"
            class="flex items-center space-y-2"
          >
            <div>
              <input
                type="radio"
                :value="choice"
                :checked="answer[0] === choice"
                @change="$emit('update:answer', [choice])"
                v-if="questionType === 'multiple choice'"
              />
              <input
                type="checkbox"
                :value="choice"
                :model-value="answer"
                @change="
                  (event) => handleRadioChange(event.target.checked, choice)
                "
                v-else-if="questionType === 'multiple answers'"
              />
            </div>
            <div class="ml-2">
              <BaseInput
                type="text"
                :model-value="choices[i]"
                @update:model-value="
                  (newChoice) => handleUpdateChoices(newChoice, i)
                "
                class="text-sm"
              />
            </div>
          </div>
          <div class="mt-2">
            <BaseButton @click="$emit('add-choice')">Add choice</BaseButton>
          </div>
        </div>
      </div>
    </div>
    <ExamItemInputSideMenu
      class="ml-2"
      @discard="$emit('discard')"
      @add-question="$emit('add-question', count)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import QuestionTypeInput from './QuestionTypeInput.vue'
import ExamItemInputSideMenu from './ExamItemInputSideMenu.vue'

export default defineComponent({
  components: { BaseInput, BaseButton, QuestionTypeInput, ExamItemInputSideMenu },
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
  emits: ['update:question', 'update:answer', 'update:questionType', 'update:choices', 'discard', 'add-choice', 'add-question'],
  watch: {
    questionType (newValue: string): void {
      if (newValue === 'multiple answers') {
        this.$emit('update:answer', [])
      } else {
        this.$emit('update:answer', [''])
      }
    }
  },
  methods: {
    handleRadioChange (checked: boolean, choice: string): void {
      const byIndex = (_value: string, index: number): boolean => {
        return this.answer.indexOf(choice) !== index
      }

      this.$emit('update:answer', checked ? [...this.answer, choice] : this.answer.filter(byIndex))
    },
    handleUpdateChoices (newChoice: string, oldChoiceIndex: number): void {
      const toNewChoice = (choice: string, index: number): string => {
        return index === oldChoiceIndex ? newChoice : choice
      }
      this.$emit('update:choices', this.choices.map(toNewChoice))
    }
  }
})
</script>
