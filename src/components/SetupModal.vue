<template>
  <teleport to="#modals">
    <AppModal v-model="modal" class="w-96">
      <template #header>{{ exam.label }}</template>
      <template #body>
        <p>Make sure you are in a well-lit room during the exam.</p>
        <ul class="mt-4 space-y-3">
          <AttemptChecklistItem
            :loading="cameraStatus === 'loading'"
            :enabled="cameraStatus === 'enabled'"
          >
            {{
              cameraStatus === 'loading'
                ? 'Enabling webcam'
                : cameraStatus === 'enabled'
                ? 'Webcam enabled'
                : 'Webcam disabled'
            }}
          </AttemptChecklistItem>
          <AttemptChecklistItem
            :loading="
              cameraStatus === 'enabled' && identification.isIdentifying
            "
            :enabled="cameraStatus === 'enabled' && identification.isIdentified"
          >
            {{
              cameraStatus === 'enabled'
                ? identification.isIdentifying
                  ? 'Identifying face'
                  : 'Face identified'
                : 'Waiting for camera'
            }}
          </AttemptChecklistItem>
        </ul>
      </template>
      <template #action>
        <AppButton
          @click="startAttempt"
          prominent
          :disabled="
            cameraStatus === 'disabled' || !identification.isIdentified
          "
        >
          {{ inProgressAttempt ? 'Continue Quiz' : 'Start Quiz' }}
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
import useModelWrapper from '@/composables/use-model-wrapper'

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
    },

    inProgressAttempt: {
      type: String,
      required: false
    },

    identification: {
      type: Object as PropType<{
        isIdentified: boolean
        isIdentifying: boolean
      }>,
      default: () => ({ isIdentified: false, isIdentifying: false })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const router = useRouter()

    const { setSnackbarMessage } = useSnackbar()

    const startAttempt = async () => {
      try {
        if (!props.inProgressAttempt) {
          const attempt = await examAttemptsService.start(props.exam.id)
          router.push(
            `/courses/${props.courseSlug}/${props.examSlug}/attempt/${attempt.id}`
          )
        } else {
          router.push(
            `/courses/${props.courseSlug}/${props.examSlug}/attempt/${props.inProgressAttempt}`
          )
        }
      } catch (error) {
        setSnackbarMessage('Attempt could not be started', 'error')
      }
    }

    const modal = useModelWrapper(props, emit, 'modelValue')

    return {
      startAttempt,
      modal
    }
  }
})
</script>
