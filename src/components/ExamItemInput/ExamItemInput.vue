<template>
  <div class="flex">
    <div
      class="flex flex-grow bg-gray-100 dark:bg-dark-04 rounded-lg shadow-md overflow-hidden"
    >
      <div class="p-1 bg-gradient-to-b from-green-400 to-green-600" />
      <div class="p-4 flex-grow">
        <div>
          <div class="flex items-start">
            <div class="flex-grow">
              <AppInput
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
          <AppInput
            placeholder="Text answer"
            class="w-1/2 text-sm"
            :model-value="answer?.[0] || ''"
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
                :checked="answer?.[0] === choice"
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
              <AppInput
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
            <AppButton @click="$emit('add-choice')">Add choice</AppButton>
          </div>
        </div>
      </div>
    </div>
    <SideMenu
      class="ml-2"
      @discard="$emit('discard')"
      @add-question="$emit('add-question', count)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import QuestionTypeInput from './components/QuestionTypeInput.vue'
import SideMenu from './components/SideMenu.vue'

export default defineComponent({
  components: { AppInput, AppButton, QuestionTypeInput, SideMenu },
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
