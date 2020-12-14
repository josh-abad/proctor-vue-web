<template>
  <div class="flex mt-3">
    <div
      class="px-3 py-2 w-40 dark:bg-gray-800 rounded-md border dark:border-gray-700"
    >
      Question {{ questionNumber }}
    </div>
    <div
      class="ml-3 px-3 py-2 dark:bg-gray-800 w-full rounded-md border dark:border-gray-700"
    >
      {{ question }}
      <div class="mt-4">
        <BaseInput
          v-if="type === 'text'"
          v-model="answer"
          @input="$emit('answer-changed', { questionId, answer })"
        />
        <div v-else-if="type === 'multiple choice'">
          <div v-for="(choice, i) in choices" :key="i">
            <input
              type="radio"
              :value="choice"
              :name="`Question ${questionNumber}`"
              :id="choice"
              v-model="answer"
              @change="$emit('answer-changed', { questionId, answer })"
            />
            <label :for="choice" class="ml-2">{{
              `${getNextAlphabetLetter(i)}. ${choice}`
            }}</label>
          </div>
        </div>
        <div v-else>
          <div v-for="(choice, i) in choices" :key="i">
            <input type="checkbox" :name="choice" :id="choice" :value="choice" v-model="answer" @change="$emit('answer-changed', { questionId, answer })" />
            <label :for="choice" class="ml-2">{{ choice }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue'

export default defineComponent({
  components: { BaseInput },
  name: 'ExamItem',
  data () {
    let answer: string | boolean[]
    if (this.type === 'text' || this.type === 'multiple choice') {
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
    questionId: String,
    question: String,
    type: String,
    questionNumber: Number,
    choices: {
      type: Array,
      required: false,
      default: null
    }
  }
})
</script>
