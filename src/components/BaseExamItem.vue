<template>
  <div class="flex mt-3 overflow-hidden border border-gray-700 rounded-lg shadow-md">
    <div class="px-3 py-3 text-gray-400 bg-gray-100 dark:bg-gray-700">
      {{ questionNumber }}
    </div>
    <div
      class="py-3 pl-4 bg-gray-100 select-none dark:bg-gray-800"
    >
      {{ examItem.question }}
      <div class="mt-4">
        <AppInput
          v-if="examItem.questionType === 'text'"
          v-model="answer"
          type="text"
        />
        <div v-else-if="examItem.questionType === 'multiple choice'" class="space-y-2">
          <RadioButton
            v-for="(choice, i) in examItem.choices"
            :key="i"
            :value="choice"
            v-model="answer"
          />
        </div>
        <div v-else class="space-y-2">
          <AppCheckbox
            v-for="(choice, i) in examItem.choices"
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
import { ExamItem } from '@/types'
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

    questionNumber: Number
  },
  emits: ['answer-changed'],
  data () {
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
    answer (newAnswer: string | string[]) {
      this.$emit('answer-changed', {
        question: this.examItem.question,
        answer: newAnswer
      })
    }
  }
})
</script>
