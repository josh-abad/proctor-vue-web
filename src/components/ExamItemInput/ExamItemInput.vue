<template>
  <li class="flex py-2 group">
    <div class="flex flex-grow overflow-hidden">
      <div class="flex-grow pr-4">
        <div class="flex items-center">
          <QuestionTypeInput v-model="questionTypeInput" />
        </div>
        <div class="flex w-full mt-2 sm:flex-grow">
          <AppInput
            placeholder="Question"
            class="w-full"
            v-model="questionInput"
            type="text"
          />
        </div>
        <div class="flex items-start mt-4">
          <div class="flex items-center -mr-10" v-if="questionType === 'text'">
            <AppInput
              placeholder="Text answer"
              class="w-full sm:w-1/2"
              v-model="textAnswerInput"
              type="text"
            />
            <AppSwitch v-model="caseSensitiveInput" class="ml-4">
              Case Sensitive
            </AppSwitch>
          </div>
          <div v-else-if="questionType !== 'essay'" class="flex items-start">
            <ul class="space-y-2" v-if="choices.length">
              <ChoiceInput
                v-for="(choice, i) in choicesInput"
                :key="i"
                v-model:value="choicesInput[i]"
                v-model:textAnswer="textAnswerInput"
                v-model:answer="answerInput"
                :type="
                  questionType === 'multiple choice' ? 'radio' : 'checkbox'
                "
              />
            </ul>
            <div class="flex items-center ml-4 first:ml-0">
              <AppButton @click="$emit('add-choice')"> Add choice </AppButton>
              <AppSwitch v-model="shuffleChoicesInput" class="ml-4">
                Shuffle Choices
              </AppSwitch>
            </div>
          </div>
          <div
            class="flex items-center ml-4 first:ml-0"
            v-if="questionType !== 'multiple answers'"
          >
            <NumberInput
              class="w-12"
              id="points"
              :min="1"
              :max="10"
              v-model="pointsInput"
            />
            <label for="points" class="ml-2">Points</label>
          </div>
        </div>
      </div>
    </div>
    <SideMenu
      class="
        ml-2
        transition-opacity
        duration-200
        ease-in-out
        opacity-0
        group-hover:opacity-100
      "
      @discard="$emit('discard')"
      @add-question="$emit('add-question')"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import QuestionTypeInput from './components/QuestionTypeInput.vue'
import SideMenu from './components/SideMenu.vue'
import AppSwitch from '../ui/AppSwitch.vue'
import ChoiceInput from '../ChoiceInput.vue'
import NumberInput from '../ui/NumberInput.vue'
import { QuestionType } from '@/types'
import useModelWrapper from '@/composables/use-model-wrapper'

export default defineComponent({
  components: {
    AppInput,
    AppButton,
    QuestionTypeInput,
    SideMenu,
    AppSwitch,
    ChoiceInput,
    NumberInput
  },
  name: 'ExamItemInput',
  props: {
    question: {
      type: String,
      default: ''
    },

    textAnswer: {
      type: String,
      default: ''
    },

    answer: {
      type: Array as PropType<string[]>,
      required: true
    },

    questionType: {
      type: String as PropType<QuestionType>,
      default: 'text'
    },

    choices: {
      type: Array as PropType<string[]>,
      required: true
    },

    shuffleChoices: {
      type: Boolean,
      required: true
    },

    caseSensitive: {
      type: Boolean,
      required: true
    },

    points: {
      type: Number,
      default: 1
    }
  },
  emits: [
    'update:modelValue',
    'update:question',
    'update:textAnswer',
    'update:answer',
    'update:questionType',
    'update:choices',
    'update:shuffleChoices',
    'update:caseSensitive',
    'update:points',
    'discard',
    'add-choice',
    'add-question'
  ],
  setup(props, { emit }) {
    const questionTypeInput = useModelWrapper(props, emit, 'questionType')
    const questionInput = useModelWrapper(props, emit, 'question')
    const textAnswerInput = useModelWrapper(props, emit, 'textAnswer')
    const answerInput = useModelWrapper(props, emit, 'answer')
    const choicesInput = useModelWrapper(props, emit, 'choices')
    const shuffleChoicesInput = useModelWrapper(props, emit, 'shuffleChoices')
    const caseSensitiveInput = useModelWrapper(props, emit, 'caseSensitive')
    const pointsInput = useModelWrapper(props, emit, 'points')

    return {
      questionTypeInput,
      questionInput,
      textAnswerInput,
      answerInput,
      choicesInput,
      shuffleChoicesInput,
      caseSensitiveInput,
      pointsInput
    }
  },
  watch: {
    questionType(newValue: string) {
      if (newValue === 'multiple answers') {
        if (!this.choices.includes(this.answer[0])) {
          this.answerInput = []
        }
      } else if (newValue === 'essay') {
        this.answerInput = ['essay']
      } else {
        this.answerInput = [this.answerInput[0]]
      }
    }
  }
})
</script>
