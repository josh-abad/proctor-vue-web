<template>
  <div class="flex mt-3">
    <div
      class="px-3 py-3 dark:bg-gray-700 rounded-l-md dark:border-gray-700"
    >
      {{ questionNumber }}
    </div>
    <div
      class="pl-4 pr-12 py-3 dark:bg-gray-800 w-full rounded-r-md border dark:border-gray-700"
    >
      {{ examItem.question }}
      <div class="mt-4">
        <BaseInput
          v-if="examItem.examType === 'text'"
          v-model="answer"
          @input="$emit('answer-changed', { questionId: examItem.id, answer })"
        />
        <div v-else-if="examItem.examType === 'multiple choice'">
          <div v-for="(choice, i) in examItem.choices" :key="i">
            <input
              type="radio"
              :value="choice"
              :name="`Question ${questionNumber}`"
              :id="choice"
              v-model="answer"
              @change="$emit('answer-changed', { questionId: examItem.id, answer })"
            />
            <label :for="choice" class="ml-2">{{
              `${getNextAlphabetLetter(i)}. ${choice}`
            }}</label>
          </div>
        </div>
        <div v-else>
          <div v-for="(choice, i) in examItem.choices" :key="i">
            <input type="checkbox" :name="choice" :id="choice" :value="choice" v-model="answer" @change="$emit('answer-changed', { questionId: examItem.id, answer })" />
            <label :for="choice" class="ml-2">{{ choice }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ExamItem } from '@/types'
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue'

export default defineComponent({
  components: { BaseInput },
  name: 'ExamItem',
  emits: ['answer-changed'],
  data () {
    let answer: string | boolean[]
    if (this.examItem.examType === 'text' || this.examItem.examType === 'multiple choice') {
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
    getNextAlphabetLetter (n: number): string {
      return String.fromCharCode(this.alphabetStart.charCodeAt(0) + n)
    }
  },
  props: {
    examItem: {
      type: Object as () => ExamItem,
      required: true
    },
    questionNumber: Number
  }
})
</script>
