<template>
  <AppPanel class="py-3 px-3">
    <Subheading><AppLabel emphasis>Exam Navigation</AppLabel></Subheading>
    <div class="grid grid-cols-10 gap-y-2 gap-x-6 pr-4 mt-3">
      <button
        v-for="examItem in questions"
        :key="examItem.id"
        class="focus:outline-none"
        @click="handleNavigation(examItem.questionNumber)"
      >
        <QuestionNumber
          :class="{
            'bg-indigo-500 dark:bg-green-500 text-white': examItem.answered,
            'border-2 border-white/20':
              !onePage && modelValue === examItem.questionNumber
          }"
        >
          {{ examItem.questionNumber }}
        </QuestionNumber>
      </button>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExamNavigationItem } from '@/types'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import Subheading from '@/components/Subheading.vue'
import QuestionNumber from '@/components/QuestionNumber.vue'

export default defineComponent({
  name: 'ExamPage',
  components: {
    AppPanel,
    AppLabel,
    Subheading,
    QuestionNumber
  },
  props: {
    questions: {
      type: Array as PropType<ExamNavigationItem[]>,
      required: true
    },
    modelValue: {
      type: Number,
      default: 1
    },
    onePage: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleNavigation(questionNumber: number) {
      this.$router.push(`#question${questionNumber}`)
      if (!this.onePage) {
        this.$emit('update:modelValue', questionNumber)
      }
    }
  }
})
</script>
