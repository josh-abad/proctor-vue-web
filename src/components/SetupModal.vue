<template>
  <teleport to="#modals">
    <AppModal
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', false)"
      class="w-96"
    >
      <template #header>{{ exam.label }}</template>
      <template #body>
        <p>Are your sure your want to attempt this quiz?</p>
        <p>Make sure you are in a well-lit room during the exam.</p>
        <ul class="mt-4 space-y-2">
          <AttemptChecklistItem
            :loading="cameraStatus === 'loading'"
            :enabled="cameraStatus === 'enabled'"
          >
            Webcam enabled
          </AttemptChecklistItem>
        </ul>
      </template>
      <template #action>
        <AppButton
          @click="startAttempt"
          prominent
          :disabled="cameraStatus !== 'enabled'"
        >
          Start Quiz
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import examAttemptsService from '@/services/exam-attempts'
import { defineComponent, PropType } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import useSnackbar from '@/composables/use-snackbar'
import AttemptChecklistItem from '@/components/AttemptChecklistItem.vue'
import { useRouter } from 'vue-router'
import { Exam } from '@/types'

export default defineComponent({
  name: 'SetupModal',
  components: {
    AppButton,
    AppModal,
    AttemptChecklistItem
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },

    courseSlug: {
      type: String,
      required: true
    },

    examSlug: {
      type: String,
      required: true
    },

    cameraStatus: {
      type: String as PropType<'enabled' | 'loading' | 'disabled'>,
      default: 'disabled'
    },

    exam: {
      type: Object as PropType<Exam>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const router = useRouter()

    const { setSnackbarMessage } = useSnackbar()

    const startAttempt = async () => {
      try {
        const attempt = await examAttemptsService.start(props.exam.id)
        router.push(
          `/courses/${props.courseSlug}/${props.examSlug}/attempt/${attempt.id}`
        )
      } catch (error) {
        setSnackbarMessage('Attempt could not be started', 'error')
      }
    }

    return {
      startAttempt
    }
  }
})
</script>
