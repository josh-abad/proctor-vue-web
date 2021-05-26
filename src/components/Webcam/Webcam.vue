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
import { defineComponent, onBeforeUnmount, onMounted, watch } from 'vue'
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
    }
  },
  emits: ['no-face-seen', 'unidentified-face'],
  setup (props, { emit }) {
    const store = useStore()

    const detectionTimer = useTimer(() => {
      emit('no-face-seen')
      detectionTimer.start()
    }, props.duration * 1000)

    const identificationTimer = useTimer(() => {
      emit('unidentified-face')
      identificationTimer.start()
    }, props.duration * 1000)

    const { video, startVideo, stopVideo, isEnabled } = useVideo()

    onBeforeUnmount(() => {
      stopVideo()
      detectionTimer.stop()
      identificationTimer.stop()
    })

    if (!store.state.user) {
      throw new Error('User not logged in')
    }

    const {
      isFaceSeen,
      isFaceIdentified,
      startDetection
    } = useFaceDetection({
      faceRecognition: store.state.user.referenceImageUrl
        ? {
          name: store.state.user.fullName,
          referenceImageUrl: store.state.user.referenceImageUrl
        }
        : undefined
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
      } else if (identificationTimer.status !== 'active' && detectionTimer.status === 'stopped') {
        identificationTimer.start()
      }
    })

    onMounted(async () => {
      if (video.value) {
        video.value.addEventListener('play', startDetection(video.value))
      }

      await startVideo()
      detectionTimer.start()
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
