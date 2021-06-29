<template>
  <li class="flex py-2" ref="input">
    <div class="flex flex-grow overflow-hidden">
      <div class="flex-grow pr-4">
        <div class="flex items-center">
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
        <div class="flex items-start mt-4">
          <div class="flex items-center -mr-10" v-if="questionType === 'text'">
            <AppInput
              placeholder="Text answer"
              class="w-full sm:w-1/2"
              :model-value="answer?.[0] || ''"
              @update:modelValue="
                newValue => $emit('update:answer', [newValue])
              "
              type="text"
            />
            <AppSwitch
              :model-value="caseSensitive"
              @update:modelValue="
                newValue => $emit('update:caseSensitive', newValue)
              "
              class="ml-4"
              >Case Sensitive</AppSwitch
            >
          </div>
          <div v-else-if="questionType !== 'essay'" class="flex items-start">
            <ul class="space-y-2" v-if="choices.length">
              <ChoiceInput
                v-for="(choice, i) in choices"
                :position="i"
                :key="i"
                :value="choice"
                :answer="answer"
                :choices="choices"
                :type="
                  questionType === 'multiple choice' ? 'radio' : 'checkbox'
                "
                @update:answer="
                  newAnswer => {
                    $emit('update:answer', newAnswer)
                    $emit('update:points', newAnswer.length)
                  }
                "
                @update:choices="
                  newChoices => $emit('update:choices', newChoices)
                "
              />
            </ul>
            <div class="flex items-center ml-4 first:ml-0">
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
          <div
            class="flex items-center ml-4 first:ml-0"
            v-if="questionType !== 'multiple answers'"
          >
            <NumberInput
              class="w-12"
              id="points"
              :min="1"
              :max="10"
              :model-value="points"
              @update:modelValue="newValue => $emit('update:points', newValue)"
            />
            <label for="points" class="ml-2">Points</label>
          </div>
        </div>
      </div>
    </div>
    <SideMenu
      class="ml-2 transition-opacity duration-200 ease-in-out"
      :class="hover ? 'opacity-100' : 'opacity-0'"
      @discard="$emit('discard')"
      @add-question="$emit('add-question', count)"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import QuestionTypeInput from './components/QuestionTypeInput.vue'
import SideMenu from './components/SideMenu.vue'
import AppSwitch from '../ui/AppSwitch.vue'
import ChoiceInput from '../ChoiceInput.vue'
import NumberInput from '../ui/NumberInput.vue'
import { QuestionType } from '@/types'

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

    count: {
      type: Number,
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
  setup() {
    const input = ref<HTMLDivElement | null>()
    const hover = ref(false)

    onMounted(() => {
      if (input.value) {
        input.value.addEventListener('mouseover', () => {
          hover.value = true
        })

        input.value.addEventListener('mouseout', () => {
          hover.value = false
        })
      }
    })

    return {
      input,
      hover
    }
  },
  watch: {
    questionType(newValue: string) {
      if (newValue === 'multiple answers') {
        if (!this.choices.includes(this.answer[0])) {
          this.$emit('update:answer', [])
        }
      } else if (newValue === 'essay') {
        this.$emit('update:answer', ['essay'])
      } else {
        this.$emit('update:answer', [this.answer[0]])
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
