<template>
  <div class="p-4">
    <div v-if="error">Invalid attempt</div>
    <div v-else-if="isLoading">Loading exam...</div>
    <div v-else-if="attempt && isActive">
      <teleport to="#modals">
        <IndicatorBar>
          <Timer :end="attempt.endDate" @timer-ended="handleSubmit" />
          <Webcam
            @no-face-seen="handleNoFaceSeen"
            @unidentified-face="handleUnidentifiedFace"
          />
          <div class="flex items-center">
            <ExclamationIcon
              class="w-10 h-10 text-gray-500 stroke-current"
              :class="{ 'text-white': warnings > 0 }"
            />
            <span class="text-3xl">{{ warnings }}</span>
          </div>
        </IndicatorBar>
      </teleport>
      <PageHeader hide-menu>
        <template #label>{{ attempt.exam.label }}</template>
      </PageHeader>
      <AppPanel class="mt-4">
        <BaseExamItem
          v-for="(item, i) in examItems"
          :key="i"
          :exam-item="item"
          :question-number="i + 1"
          v-model="answers"
        />
        <div class="flex items-center justify-between mt-4">
          <ModalButton
            header="Submit Answers"
            message="Are you sure you want to submit your answers?"
            action-label="Submit"
            @confirm="handleSubmit"
            prominent
            >Submit</ModalButton
          >
        </div>
      </AppPanel>
    </div>
    <Center v-else>
      <div class="flex flex-col items-center">
        <p class="text-2xl font-thin">
          Sorry, you are not allowed to take this exam.
        </p>
        <AppButton
          class="mt-3"
          @click="$router.push(`/courses/${courseId}`)"
          prominent
          >Return to course</AppButton
        >
      </div>
    </Center>
    <teleport to="#modals">
      <AppModal :open="warningModal.isOpen" @close="warningModal.close">
        <template #header> Warning </template>
        <template #body>
          Please refrain from leaving this page during the exam. You have
          {{ warningsLeft }}
          {{ warningsLeft === 1 ? 'warning' : 'warnings' }} left.
        </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import BaseExamItem from '@/components/BaseExamItem.vue'
import { Answer, Attempt, ExamItem } from '@/types'
import Timer from '@/components/Timer.vue'
import { SUBMIT_EXAM } from '@/store/action-types'
import AppPanel from '@/components/ui/AppPanel.vue'
import Center from '@/components/Center.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import useFetch from '@/composables/use-fetch'
import examAttemptsService from '@/services/exam-attempts'
import useSnackbar from '@/composables/use-snackbar'
import useModal from '@/composables/use-modal'
import useKeepOnPage from '@/composables/use-keep-on-page'
import useWarning from '@/composables/use-warning'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { shuffle } from '@/utils/helper'
import IndicatorBar from '@/components/IndicatorBar.vue'
import useTitle from '@/composables/use-title'

export default defineComponent({
  name: 'ExamPage',
  components: {
    BaseExamItem,
    AppButton,
    Timer,
    AppPanel,
    Center,
    PageHeader,
    ModalButton,
    AppModal,
    Webcam,
    ExclamationIcon,
    IndicatorBar
  },
  props: {
    courseId: {
      type: String,
      required: true
    },
    examId: {
      type: String,
      required: true
    },
    attemptId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const { setSnackbarMessage } = useSnackbar()

    const [attempt, fetchAttempt, isLoading, error] = useFetch<Attempt | null>(
      () => examAttemptsService.getAttempt(props.attemptId, 'in-progress')
    )

    const warningModal = useModal()

    const isActive = ref(false)

    const answers = ref<Answer[]>([])

    const handleSubmit = async () => {
      await store.dispatch(SUBMIT_EXAM, {
        answers: answers.value,
        examId: props.examId
      })
      isActive.value = false
      router.replace(`/courses/${props.courseId}/exams/${props.examId}`)
    }

    // const handleUnload = async () => {
    //   localStorage.setItem('pendingSubmission', JSON.stringify({
    //     answers: answers.value,
    //     examId: props.examId,
    //     submittedDate: new Date()
    //   }))
    //   store.commit(SET_ACTIVE_EXAM, null)
    //   await store.dispatch(SUBMIT_EXAM, {
    //     answers: answers.value,
    //     examId: props.examId
    //   })
    // }

    const { warn, warnings, warningsLeft } = useWarning({
      maximum: 5,
      onWarn: warningModal.open,
      onExceed: handleSubmit
    })

    const { setTitle } = useTitle()

    useKeepOnPage({
      preventLeave: isActive,
      onLeaveAttempt: () => {
        setSnackbarMessage(
          'You cannot leave until you have finished the exam',
          'warning'
        )
      },
      onLeaveFocus: warn,
      onLeaveTimeout: warn
    })

    fetchAttempt()
      .then(() => {
        isActive.value = true

        if (attempt.value) {
          setTitle(`${attempt.value.exam.label} - Proctor Vue`)
        }
      })
      .catch(() => {
        setTitle('Invalid Exam - Proctor Vue')
      })

    const handleNoFaceSeen = () => {
      warn(true)
      setSnackbarMessage('No face seen for 10 seconds.', 'warning')
    }

    const handleUnidentifiedFace = () => {
      warn(true)
      setSnackbarMessage('Face unidentified for 10 seconds', 'warning')
    }

    onUnmounted(() => {
      if (isActive.value) {
        handleSubmit()
      }
    })

    const shuffledExamItems = computed<ExamItem[]>(() => {
      if (!attempt.value) {
        return []
      }
      return attempt.value.exam.random
        ? shuffle([...attempt.value.exam.examItems])
        : attempt.value.exam.examItems
    })

    return {
      attempt,
      isLoading,
      error,
      setSnackbarMessage,
      warningModal,
      warnings,
      warningsLeft,
      handleSubmit,
      answers,
      isActive,
      handleNoFaceSeen,
      handleUnidentifiedFace,
      examItems: shuffledExamItems
    }
  }
})
</script>
