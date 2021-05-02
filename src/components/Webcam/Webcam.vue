<template>
  <div>
    <div class="flex items-center">
      <DetectionIndicator
        :on="cameraOn"
        :detected="faceSeen"
        :identified="faceIdentified"
      />
      <div class="ml-2" v-if="debug">
        {{
          faceIdentified
            ? "Face Identified"
            : faceSeen
            ? "Face Detected"
            : "No Face detected"
        }}
      </div>
    </div>
    <video
      v-show="cameraOn && !hideVideo"
      ref="video"
      width="100"
      height="60"
      autoplay
      muted
    />
    <div class="webcam-timer-display" v-if="debug">
      <div class="timer">
        <h3 class="timer-header">Detection Timer</h3>
        <div class="timer-remaining">
          Remaining: {{ remainingDetectionTime }} seconds
        </div>
        <div class="timer-status">Status: {{ detectionTimerStatus }}</div>
      </div>
      <div class="timer">
        <h3 class="timer-header">Identification Timer</h3>
        <div class="timer-remaining">
          Remaining: {{ remainingIdentificationTime }} seconds
        </div>
        <div class="timer-status">Status: {{ identificationTimerStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions, TNetInput } from 'face-api.js'
import { ALERT } from '@/store/action-types'
import DetectionIndicator from './components/DetectionIndicator.vue'
import useTimer from '@/composables/use-timer'

const USE_TINY_MODEL = true
const MODELS_URL = '/models'

export default defineComponent({
  name: 'Webcam',
  components: { DetectionIndicator },
  props: {
    hideVideo: {
      type: Boolean,
      default: false
    },

    duration: {
      type: Number,
      default: 5
    },

    debug: {
      type: Boolean,
      default: false
    }
  },
  emits: ['no-face-seen', 'unidentified-face'],
  setup (props, { emit }) {
    const {
      status: detectionTimerStatus,
      startTimer: startDetectionTimer,
      stopTimer: stopDetectionTimer,
      remainingTime: remainingDetectionTime
    } = useTimer(() => {
      emit('no-face-seen')
      startDetectionTimer()
    }, props.duration * 1000)

    const {
      status: identificationTimerStatus,
      startTimer: startIdentificationTimer,
      stopTimer: stopIdentificationTimer,
      remainingTime: remainingIdentificationTime,
      pauseTimer: pauseIdentificationTimer
    } = useTimer(() => {
      emit('unidentified-face')
      startIdentificationTimer()
    }, props.duration * 1000)

    return {
      detectionTimerStatus,
      startDetectionTimer,
      stopDetectionTimer,
      remainingDetectionTime,
      remainingIdentificationTime,
      identificationTimerStatus,
      startIdentificationTimer,
      stopIdentificationTimer,
      pauseIdentificationTimer
    }
  },
  data () {
    return {
      faceSeen: false,
      multipleFacesSeen: 0,
      usersSeen: [] as string[],
      video: {} as HTMLMediaElement,
      cameraOn: false
    }
  },
  computed: {
    userName (): string {
      return this.$store.state.user?.fullName || ''
    },

    faceIdentified (): boolean {
      return this.usersSeen.length === 1 && this.usersSeen[0].includes(this.userName)
    }
  },
  watch: {
    faceSeen (isFaceSeen: boolean): void {
      if (isFaceSeen) {
        this.stopDetectionTimer()
        if (this.identificationTimerStatus === 'paused') {
          this.startIdentificationTimer()
        }
      } else if (['stopped', 'paused'].includes(this.detectionTimerStatus)) {
        this.startDetectionTimer()
        this.pauseIdentificationTimer()
      }
    },
    faceIdentified (isFaceIdentified: boolean): void {
      if (isFaceIdentified) {
        this.stopIdentificationTimer()
      } else if (['stopped', 'paused'].includes(this.identificationTimerStatus) && this.detectionTimerStatus === 'stopped') {
        this.startIdentificationTimer()
      }
    }
  },
  async mounted () {
    this.video = this.$refs.video as HTMLMediaElement

    await this.loadModels()

    const faceMatcher = await this.createFaceMatcher()
    if (!faceMatcher) return

    this.video.addEventListener('play', this.startDetection(faceMatcher))

    await this.startVideo()
    this.startDetectionTimer()
  },
  unmounted () {
    this.stopVideo()
    this.stopDetectionTimer()
    this.stopIdentificationTimer()
  },
  methods: {
    async loadModels () {
      await Promise.all([
        faceapi.loadTinyFaceDetectorModel(MODELS_URL),
        faceapi.loadFaceLandmarkTinyModel(MODELS_URL),
        faceapi.loadFaceRecognitionModel(MODELS_URL)
      ])
    },
    startDetection (faceMatcher: faceapi.FaceMatcher) {
      return () => {
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(this.video as TNetInput, new TinyFaceDetectorOptions({ inputSize: 128 }))
            .withFaceLandmarks(USE_TINY_MODEL)
            .withFaceDescriptors()

          const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor))

          this.faceSeen = !!detections.length
          this.usersSeen = results.map(match => match.toString())
          this.multipleFacesSeen = detections.length
        }, 300)
      }
    },
    async startVideo () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
        this.video.srcObject = stream
        this.video.play()
        this.cameraOn = true
      } catch (error) {
        this.$store.dispatch(ALERT, error)
      }
    },
    stopVideo () {
      const stream = this.video?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        this.cameraOn = false
      }
    },
    async createFaceMatcher () {
      const imgUrl = this.$store.state.user?.referenceImageUrl

      if (!imgUrl) return null

      try {
        const img = await faceapi.fetchImage(encodeURI(imgUrl))
        const detection = await faceapi
          .detectSingleFace(img, new TinyFaceDetectorOptions())
          .withFaceLandmarks(USE_TINY_MODEL)
          .withFaceDescriptor()

        if (!detection) {
          throw new Error(`No face detected for ${this.userName}.`)
        }

        const descriptor = [detection.descriptor]
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(this.userName || 'unknown', descriptor)

        const maxDescriptorDistance = 0.6
        return new faceapi.FaceMatcher(labeledDescriptor, maxDescriptorDistance)
      } catch (error) {
        return null
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.timer-header {
  @apply font-semibold;
}
</style>
