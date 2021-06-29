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
    <div>
      <List>
        <BaseExamItem
          :id="`question${i + 1}`"
          v-for="(item, i) in attempt.exam.examItems"
          class="py-6 first:pt-0"
          :key="item.id"
          :exam-item="item"
          :question-number="i + 1"
          :model-value="attempt.answers"
          readonly
        />
      </List>
      <teleport to="#quiz-navigation">
        <ExamNavigation :questions="progress" class="ml-4" />
      </teleport>
    </div>
    <div class="flex justify-end mt-4">
      <AppButton type="button" @click="$router.back">Go Back</AppButton>
      <ModalButton
        class="ml-4"
        header="Grade Essay"
        message="Are you sure you want to submit this grade?"
        action-label="Submit"
        prominent
      >
        Grade
      </ModalButton>
    </div>
  </div>
</template>

<script lang="ts">
import useFetch from '@/composables/use-fetch'
import examAttemptsService from '@/services/exam-attempts'
import { Attempt } from '@/types'
import { computed, defineComponent } from 'vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import ExamNavigation from '@/components/ExamNavigation.vue'
import List from '@/components/List.vue'
import AppButton from '@/components/ui/AppButton.vue'

export default defineComponent({
  name: 'ReviewExamPage',
  props: {
    courseSlug: {
      type: String,
      requird: true
    },

    examSlug: {
      type: String,
      requird: true
    },

    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [attempt, fetchAttempt, isLoading, hasError] =
      useFetch<Attempt | null>(() => examAttemptsService.getAttempt(props.id))

    fetchAttempt()

    const progress = computed(() => {
      if (!attempt.value) {
        return []
      }
      return attempt.value.exam.examItems.map((examItem, index) => {
        return {
          questionNumber: index + 1,
          id: examItem.id,
          answered:
            attempt.value?.answers.some(
              answer => answer.examItem === examItem.id && answer.answer.length
            ) ?? false
        }
      })
    })

    return {
      attempt,
      isLoading,
      hasError,
      progress
    }
  },
  components: {
    BaseExamItem,
    AppSkeleton,
    ModalButton,
    ExamNavigation,
    List,
    AppButton
  }
})
</script>
