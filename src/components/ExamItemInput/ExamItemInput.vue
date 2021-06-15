<template>
  <div class="flex">
    <div class="flex flex-grow overflow-hidden">
      <div class="flex-grow py-4 pr-4">
        <div class="w-full">
          <QuestionTypeInput
            :model-value="questionType"
            @update:modelValue="
              newValue => $emit('update:questionType', newValue)
            "
          />
        </div>
        <div class="flex w-full mt-2 sm:flex-grow">
          <AppInput
            placeholder="Question"
            class="w-full"
            :model-value="question"
            @update:modelValue="newValue => $emit('update:question', newValue)"
            type="text"
          />
        </div>
        <div class="mt-4"></div>
        <div class="mt-4" v-if="questionType === 'text'">
          <AppInput
            placeholder="Text answer"
            class="w-full text-sm sm:w-1/2"
            :model-value="answer?.[0] || ''"
            @update:modelValue="newValue => $emit('update:answer', [newValue])"
            type="text"
          />
        </div>
        <div class="mt-4" v-else>
          <ul class="space-y-2">
            <ChoiceInput
              v-for="(choice, i) in choices"
              :key="i"
              :value="choice"
              :answer="answer"
              :choices="choices"
              :type="questionType === 'multiple choice' ? 'radio' : 'checkbox'"
              @update:answer="newAnswer => $emit('update:answer', newAnswer)"
              @update:choices="
                newChoices => $emit('update:choices', newChoices)
              "
            />
          </ul>
          <div class="flex items-center mt-4">
            <AppButton @click="$emit('add-choice')"> Add choice </AppButton>
            <AppSwitch
              :model-value="shuffleChoices"
              @update:modelValue="
                newValue => $emit('update:shuffleChoices', newValue)
              "
              class="ml-4"
            >
              Shuffle Choices
            </AppSwitch>
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
import AppSwitch from '../ui/AppSwitch.vue'
import ChoiceInput from '../ChoiceInput.vue'

export default defineComponent({
  components: {
    AppInput,
    AppButton,
    QuestionTypeInput,
    SideMenu,
    AppSwitch,
    ChoiceInput
  },
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
    },

    shuffleChoices: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'update:modelValue',
    'update:question',
    'update:answer',
    'update:questionType',
    'update:choices',
    'update:shuffleChoices',
    'discard',
    'add-choice',
    'add-question'
  ],
  watch: {
    questionType(newValue: string) {
      if (newValue === 'multiple answers') {
        this.$emit('update:answer', [])
      } else {
        this.$emit('update:answer', [''])
      }
    }
  },
  methods: {
    handleRadioChange($event: Event, choice: string) {
      const byIndex = (_value: string, index: number): boolean => {
        return this.answer.indexOf(choice) !== index
      }

      if ($event.target instanceof HTMLInputElement) {
        this.$emit(
          'update:answer',
          $event.target.checked
            ? [...this.answer, choice]
            : this.answer.filter(byIndex)
        )
      }
    },
    handleUpdateChoices(
      $event: string | number | undefined,
      oldChoiceIndex: number
    ) {
      if (typeof $event === 'string') {
        const toNewChoice = (choice: string, index: number): string => {
          return index === oldChoiceIndex ? $event : choice
        }
        this.$emit('update:choices', this.choices.map(toNewChoice))
      }
    }
  }
})
</script>
