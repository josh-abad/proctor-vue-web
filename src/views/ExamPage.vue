<template>
  <div class="mt-5">
    <div class="text-xl bg-gray-800 px-3 py-2">
      {{ exam.label }}
      {{ exam.course.name }}
    </div>
    <BaseExamItem
      v-for="(item, i) in exam.questions"
      :key="item.id"
      :examItem="item"
      :questionNumber="i + 1"
      @answer-changed="handleAnswerChange"
    />
    <div class="mt-4 flex justify-end">
      <BaseButton label="Submit" @click="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import examResultsServices from '@/services/exam_results'
import { Answer, Exam } from '@/types'

export default defineComponent({
  components: { BaseExamItem, BaseButton },
  name: 'ExamPage',
  data () {
    const answers: Answer[] = []
    return {
      answers
    }
  },
  mounted () {
    document.title = this.exam.label
  },
  computed: {
    exam (): Exam {
      const id: string | string[] = this.$route.params.id
      return this.$store.getters.getExamByID(id)
    }
  },
  methods: {
    handleAnswerChange ({ questionId, answer }: Answer): void {
      if (this.answers.some((a: Answer) => a.questionId === questionId)) {
        const index = this.answers.findIndex(a => a.questionId === questionId)
        this.answers[index] = { questionId, answer }
      } else {
        this.answers.push({ questionId, answer })
      }
    },
    async handleSubmit (): Promise<void> {
      const results = await examResultsServices.submit({
        answers: this.answers,
        examId: this.exam.id
      })
      console.log(results)
    }
  }
})
</script>
