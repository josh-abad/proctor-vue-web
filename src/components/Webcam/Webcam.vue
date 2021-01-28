<template>
  <div>
    <div>
      {{ faceSeen ? "Face detected" : "No face detected" }}
      <span>
        {{
          usersSeen.some((seen) => seen.includes(userName))
            ? `(${userName})`
            : `${faceSeen ? "(unknown)" : ""}`
        }}
      </span>
    </div>
    <div class="font-bold">
      {{ multipleFacesSeen }}
      {{ multipleFacesSeen === 1 ? "face" : "faces" }} detected
    </div>
    <EyeIcon :on="cameraOn" />
    <video
      v-show="cameraOn && !hideVideo"
      ref="video"
      width="100"
      height="60"
      autoplay
      muted
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions, TNetInput } from 'face-api.js'
import { ALERT } from '@/store/action-types'
import userMixin from '@/mixins/user'
import EyeIcon from './components/EyeIcon.vue'

const USE_TINY_MODEL = true
const MODELS_URL = '/models'

export default defineComponent({
  name: 'Webcam',
  components: { EyeIcon },
  mixins: [userMixin],
  props: {
    hideVideo: {
      type: Boolean,
      default: false
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
      return this.user?.fullName || ''
    }
  },
  async mounted () {
    this.video = this.$refs.video as HTMLMediaElement

    await this.loadModels()

    const faceMatcher = await this.createFaceMatcher()
    if (!faceMatcher) return

    this.video.addEventListener('play', this.startDetection(faceMatcher))

    await this.startVideo()
  },
  unmounted () {
    this.stopVideo()
  },
  methods: {
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
        }, 64)
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
