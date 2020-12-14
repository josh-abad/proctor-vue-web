<template>
  <div>
    <ExamItem
      v-for="(item, i) in examItems"
      :key="item.id"
      :choices="item.choices"
      :questionId="item.id"
      :question="item.question"
      :questionNumber="i + 1"
      :type="item.examType"
      @answer-changed="handleAnswerChange"
    />
    <div class="mt-4 flex justify-end">
      <BaseButton label="Submit" @click="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import ExamItem from '@/components/ExamItem.vue'
import { defineComponent } from 'vue'
import examsServices from '@/services/exams'
import { Answer, ExamItemContent } from '@/types'

export default defineComponent({
  components: { ExamItem, BaseButton },
  name: 'ExamPage',
  data () {
    const answers: Answer[] = []
    return {
      answers
    }
  },
  computed: {
    examItems (): ExamItemContent[] {
      return this.$store.getters.getExamItemsByCourse(this.$route.params.id)
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
      const results = await examsServices.submit(this.answers)
      console.log(results)
    }
  }
})
</script>
