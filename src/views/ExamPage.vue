<template>
  <div v-if="hasError">Invalid attempt</div>
  <List v-else-if="isLoading">
    <div class="flex w-full mt-4 first:mt-0" v-for="i in 10" :key="i">
      <AppSkeleton class="w-6 h-6 mt-4" />
      <div class="py-4 pl-4">
        <AppSkeleton class="h-5 w-52" />
        <AppSkeleton class="mt-4 w-60 h-7" />
      </div>
    </div>
  </List>
  <div v-else-if="attempt">
    <List>
      <BaseExamItem
        v-for="(item, i) in examItems"
        class="first:mt-0"
        :key="i"
        :exam-item="item"
        :question-number="i + 1"
        v-model="answers"
      />
    </List>
    <div class="flex items-center justify-between mt-4">
      <teleport to="#timer">
        <Timer :end="attempt.endDate" @timer-ended="handleSubmit" />
      </teleport>
      <ModalButton
        header="Submit Answers"
        message="Are you sure you want to submit your answers?"
        action-label="Submit"
        @confirm="handleSubmit"
        prominent
      >
        Submit
      </ModalButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import { Answer, Attempt, ExamItem } from '@/types'
import useFetch from '@/composables/use-fetch'
import { shuffle } from '@/utils/helper'
import { useRouter } from 'vue-router'
import examResultsService from '@/services/exam-results'
import examAttemptsService from '@/services/exam-attempts'
import Timer from '@/components/Timer.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import List from '@/components/List.vue'

export default defineComponent({
  name: 'ExamPage',
  components: { BaseExamItem, ModalButton, Timer, AppSkeleton, List },
  props: {
    courseSlug: {
      type: String,
      required: true
    },

    examSlug: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    },

    starting: {
      type: Boolean,
      default: true
    },

    warnings: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:active', 'update:starting'],
  setup(props, { emit }) {
    const router = useRouter()

    const answers = ref<Answer[]>([])

    const [attempt, fetchAttempt, isLoading, hasError] =
      useFetch<Attempt | null>(() =>
        examAttemptsService.getAttempt(props.id, 'in-progress')
      )

    fetchAttempt().then(() => {
      emit('update:active', true)
    })

    const shuffledExamItems = computed<ExamItem[]>(() => {
      if (!attempt.value) {
        return []
      }
      return attempt.value.exam.random
        ? shuffle([...attempt.value.exam.examItems])
        : attempt.value.exam.examItems
    })

    const handleSubmit = async () => {
      if (attempt.value) {
        await examResultsService.submit({
          answers: answers.value,
          examId: attempt.value.exam.id
        })
        await router.replace(`/courses/${props.courseSlug}/${props.examSlug}`)
        emit('update:active', false)
        emit('update:starting', false)
      }
    }

    watch(
      () => props.warnings,
      warnings => {
        if (warnings === 5) {
          handleSubmit()
        }
      }
    )

    return {
      answers,
      attempt,
      isLoading,
      hasError,
      handleSubmit,
      examItems: shuffledExamItems
    }
  }
})
</script>
