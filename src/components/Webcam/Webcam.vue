<template>
  <div>
    <div class="flex items-center">
      <EyeIcon
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
          Remaining: {{ detectionTimer?.remaining ?? 0 }} seconds
        </div>
        <div class="timer-status">
          Status: {{ detectionTimer?.status ?? "stopped" }}
        </div>
      </div>
      <div class="timer">
        <h3 class="timer-header">Identification Timer</h3>
        <div class="timer-remaining">
          Remaining: {{ identificationTimer?.remaining ?? 0 }} seconds
        </div>
        <div class="timer-status">
          Status: {{ identificationTimer?.status ?? "stopped" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions, TNetInput } from 'face-api.js'
import { ALERT } from '@/store/action-types'
import userMixin from '@/mixins/user'
import EyeIcon from './components/EyeIcon.vue'
import { WebcamTimer } from '@/types'

const USE_TINY_MODEL = true
const MODELS_URL = './assets/models'

export default defineComponent({
  name: 'Webcam',
  components: { EyeIcon },
  mixins: [userMixin],
  props: {
    hideVideo: {
      type: Boolean,
      default: false
    },

    detectionDuration: {
      type: Number,
      default: 5
    },

    debug: {
      type: Boolean,
      default: false
    }
  },
  emits: ['no-face-seen', 'unidentified-face'],
  data () {
    return {
      faceSeen: false,
      multipleFacesSeen: 0,
      usersSeen: [] as string[],
      video: {} as HTMLMediaElement,
      cameraOn: false,
      detectionTimer: null as WebcamTimer | null,
      identificationTimer: null as WebcamTimer | null
    }
  },
  computed: {
    userName (): string {
      return this.user?.fullName || ''
    },

    faceIdentified (): boolean {
      return this.usersSeen.length === 1 && this.usersSeen[0].includes(this.userName)
    },

    duration (): number {
      return this.detectionDuration * 1000
    }
  },
  watch: {
    faceSeen (isFaceSeen: boolean): void {
      if (this.detectionTimer) {
        if (isFaceSeen) {
          this.detectionTimer.stop()
          if (this.identificationTimer?.status === 'paused') {
            this.identificationTimer && this.identificationTimer.resume()
          }
        } else if (['stopped', 'paused'].includes(this.detectionTimer.status)) {
          this.detectionTimer.start()
          this.identificationTimer && this.identificationTimer.pause()
        }
      }
    },
    faceIdentified (isFaceIdentified: boolean): void {
      if (this.identificationTimer) {
        if (isFaceIdentified) {
          this.identificationTimer.stop()
        } else if (['stopped', 'paused'].includes(this.identificationTimer.status) && this.detectionTimer?.status === 'stopped') {
          this.identificationTimer.start()
        }
      }
    }
  },
  async mounted () {
    this.detectionTimer = new WebcamTimer(this.detectionTimeout, this.duration)
    this.identificationTimer = new WebcamTimer(this.identificationTimeout, this.duration)

    this.video = this.$refs.video as HTMLMediaElement

    await this.loadModels()

    const faceMatcher = await this.createFaceMatcher()
    if (!faceMatcher) return

    this.video.addEventListener('play', this.startDetection(faceMatcher))

    await this.startVideo()
    this.detectionTimer.start()
  },
  unmounted () {
    this.stopVideo()
    this.detectionTimer && this.detectionTimer.stop()
    this.identificationTimer && this.identificationTimer.stop()
  },
  methods: {
    detectionTimeout (): void {
      this.$emit('no-face-seen')
      this.detectionTimer && this.detectionTimer.start()
    },
    identificationTimeout (): void {
      this.$emit('unidentified-face')
      this.identificationTimer && this.identificationTimer.start()
    },
    async loadModels (): Promise<void> {
      await Promise.all([
        faceapi.loadTinyFaceDetectorModel(MODELS_URL),
        faceapi.loadFaceLandmarkTinyModel(MODELS_URL),
        faceapi.loadFaceRecognitionModel(MODELS_URL)
      ])
    },
    startDetection (faceMatcher: faceapi.FaceMatcher): () => void {
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
    async startVideo (): Promise<void> {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
        this.video.srcObject = stream
        this.video.play()
        this.cameraOn = true
      } catch (error) {
        this.$store.dispatch(ALERT, error)
      }
    },
    stopVideo (): void {
      const stream = this.video?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        this.cameraOn = false
      }
    },
    async createFaceMatcher (): Promise<faceapi.FaceMatcher | null> {
      const imgUrl = this.user?.referenceImageUrl

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
