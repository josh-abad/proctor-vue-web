<template>
  <div class="flex mt-3 overflow-hidden rounded-lg shadow-md">
    <div class="px-3 py-3 text-gray-400 bg-gray-100 dark:bg-gray-700">
      {{ questionNumber }}
    </div>
    <div
      class="w-full py-3 pl-4 pr-12 bg-gray-100 select-none dark:bg-gray-800"
    >
      {{ examItem.question }}
      <div class="mt-4">
        <AppInput
          v-if="examItem.questionType === 'text'"
          v-model="answer"
          type="text"
          @input="
            $emit('answer-changed', { question: examItem.question, answer })
          "
        />
        <div v-else-if="examItem.questionType === 'multiple choice'">
          <div v-for="(choice, i) in examItem.choices" :key="i">
            <input
              type="radio"
              :value="choice"
              :name="`Question ${questionNumber}`"
              :id="choice"
              v-model="answer"
              @change="
                $emit('answer-changed', { question: examItem.question, answer })
              "
            />
            <label :for="choice" class="ml-2">{{
              `${getNextAlphabetLetter(i)}. ${choice}`
            }}</label>
          </div>
        </div>
        <div v-else>
          <div v-for="(choice, i) in examItem.choices" :key="i">
            <input
              type="checkbox"
              :name="choice"
              :id="choice"
              :value="choice"
              v-model="answer"
              @change="
                $emit('answer-changed', { question: examItem.question, answer })
              "
            />
            <label :for="choice" class="ml-2">{{ choice }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ExamItem } from '@/types'
import { defineComponent, PropType } from 'vue'
import AppInput from './ui/AppInput.vue'

export default defineComponent({
  name: 'BaseExamItem',
  components: { AppInput },
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
    if (this.examItem.questionType === 'text' || this.examItem.questionType === 'multiple choice') {
      answer = ''
    } else {
      answer = []
    }
    return {
      alphabetStart: 'a',
      answer
    }
  },
  methods: {
    getNextAlphabetLetter (n: number) {
      return String.fromCharCode(this.alphabetStart.charCodeAt(0) + n)
    }
  }
})
</script>
