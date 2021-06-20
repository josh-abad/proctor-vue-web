<template>
  <div>
    <div class="flex items-center">
      <DetectionIndicator
        :on="isEnabled"
        :detected="isFaceSeen"
        :identified="isFaceIdentified"
      />
    </div>
    <video
      v-show="isEnabled && showVideo"
      ref="video"
      width="100"
      height="60"
      autoplay
      muted
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  ref,
  watch,
  watchEffect
} from 'vue'
import DetectionIndicator from './components/DetectionIndicator.vue'
import useTimer from '@/composables/use-timer'
import useFaceDetection from '@/composables/use-face-detection'
import useVideo from '@/composables/use-video'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Webcam',
  components: { DetectionIndicator },
  props: {
    showVideo: {
      type: Boolean,
      default: false
    },

    duration: {
      type: Number,
      default: 5
    },

    on: {
      type: Boolean,
      default: true
    },

    examStarted: {
      type: Boolean,
      default: false
    }
  },
  emits: ['no-face-seen', 'unidentified-face', 'camera-status-change'],
  setup(props, { emit }) {
    const store = useStore()

    if (!store.state.user) {
      throw new Error('User not logged in')
    }

    const detectionTimer = useTimer(() => {
      emit('no-face-seen')
      detectionTimer.start()
    }, props.duration * 1000)

    const identificationTimer = useTimer(() => {
      emit('unidentified-face')
      identificationTimer.start()
    }, props.duration * 1000)

    const { video, startVideo, stopVideo, isEnabled } = useVideo()

    const {
      isFaceSeen,
      isFaceIdentified,
      startDetection,
      stopDetection,
      loadFaceDetection,
      hasLoadedModels
    } = useFaceDetection({
      faceRecognition: store.state.user.referenceImageUrl
        ? {
            name: store.state.user.fullName,
            referenceImageUrl: store.state.user.referenceImageUrl
          }
        : undefined
    })

    const isLoading = ref(false)
    const cameraStatus = computed(() => {
      if (isLoading.value) {
        return 'loading'
      } else if (isEnabled.value) {
        return 'enabled'
      } else {
        return 'disabled'
      }
    })

    watchEffect(() => {
      emit('camera-status-change', cameraStatus.value)
    })

    watch(
      () => props.examStarted,
      isExamStarted => {
        if (isExamStarted) {
          detectionTimer.start()
        }
      }
    )

    const handleDetection = computed(() => {
      return video.value && hasLoadedModels ? startDetection(video.value) : null
    })

    watch(
      () => props.on,
      isOn => {
        if (isOn) {
          isLoading.value = true
          loadFaceDetection()
            .then(startVideo)
            .finally(() => {
              isLoading.value = false
            })

          if (video.value && handleDetection.value) {
            video.value.addEventListener('play', handleDetection.value)
          }
          // detectionTimer.start()
        } else {
          stopVideo()
          stopDetection()
          if (video.value && handleDetection.value) {
            video.value.removeEventListener('play', handleDetection.value)
          }
          detectionTimer.stop()
        }
      }
    )

    onUnmounted(() => {
      stopVideo()
      stopDetection()
      detectionTimer.stop()
      identificationTimer.stop()

      if (video.value && handleDetection.value) {
        video.value.removeEventListener('play', handleDetection.value)
      }
    })

    watch(isFaceSeen, isSeen => {
      if (isSeen) {
        detectionTimer.stop()
        if (identificationTimer.status === 'paused') {
          identificationTimer.start()
        }
      } else if (detectionTimer.status !== 'active') {
        detectionTimer.start()
        identificationTimer.pause()
      }
    })

    watch(isFaceIdentified, isIdentified => {
      if (isIdentified) {
        identificationTimer.stop()
      } else if (
        identificationTimer.status !== 'active' &&
        detectionTimer.status === 'stopped'
      ) {
        identificationTimer.start()
      }
    })

    return {
      detectionTimer,
      identificationTimer,
      video,
      isFaceSeen,
      isFaceIdentified,
      isEnabled
    }
  }
})
</script>

<style lang="postcss" scoped>
.timer-header {
  @apply font-semibold;
}
</style>
