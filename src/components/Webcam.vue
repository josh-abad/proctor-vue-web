<template>
  <div class="p-6">
    <div class="font-bold text-2xl">Webcam Test</div>
    <div>{{ faceSeen ? "Face detected" : "No face detected" }}</div>
    <div class="font-bold">
      {{ multipleFacesSeen }}
      {{ multipleFacesSeen === 1 ? "face" : "faces" }} detected
    </div>
    <div>
      {{
        usersSeen.some((seen) => seen.includes(user?.fullName || "unknown"))
          ? user?.fullName
          : ""
      }}
    </div>
    <video
      v-show="cameraOn"
      ref="video"
      width="100"
      height="60"
      autoplay
      muted
    />
    <div class="mt-4" v-if="cameraOn">
      <BaseButton @click="stopVideo" prominent>Stop video</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions, TNetInput } from 'face-api.js'
import { ALERT } from '@/store/action-types'
import BaseButton from './BaseButton.vue'
import userMixin from '@/mixins/user'

const USE_TINY_MODEL = true

export default defineComponent({
  name: 'Webcam',
  components: { BaseButton },
  mixins: [userMixin],
  data () {
    return {
      faceSeen: false,
      multipleFacesSeen: 0,
      usersSeen: [] as string[],
      video: {} as HTMLMediaElement,
      cameraOn: false
    }
  },
  async mounted () {
    this.video = this.$refs.video as HTMLMediaElement

    await this.loadModels()

    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then(stream => (this.video.srcObject = stream))
      .catch(error => this.$store.dispatch(ALERT, error))
    this.cameraOn = true

    const faceMatcher = await this.createFaceMatcher()

    if (!faceMatcher) return

    const input = this.video as HTMLMediaElement
    input.addEventListener('play', () => {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(input as TNetInput, new TinyFaceDetectorOptions({ inputSize: 128 }))
          .withFaceLandmarks(USE_TINY_MODEL)
          .withFaceDescriptors()

        const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor))

        this.faceSeen = !!detections.length
        this.usersSeen = results.map(match => match.toString())
        this.multipleFacesSeen = detections.length
      }, 64)
    })
  },
  unmounted () {
    this.stopVideo()
  },
  methods: {
    async loadModels (): Promise<void> {
      await Promise.all([
        faceapi.loadTinyFaceDetectorModel('./models'),
        faceapi.loadFaceLandmarkTinyModel('./models'),
        faceapi.loadFaceRecognitionModel('./models')
      ])
    },
    stopVideo (): void {
      (this.video?.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop())
      this.cameraOn = false
    },
    async createFaceMatcher (): Promise<faceapi.FaceMatcher | null> {
      const imgUrl = this.user?.referenceImageUrl

      if (!imgUrl) return null

      const img = await faceapi.fetchImage(imgUrl)
      const detection = await faceapi
        .detectSingleFace(img, new TinyFaceDetectorOptions())
        .withFaceLandmarks(USE_TINY_MODEL)
        .withFaceDescriptor()

      if (!detection) {
        throw new Error(`No face detected for ${this.user?.fullName}.`)
      }

      const descriptor = [detection.descriptor]
      const labeledDescriptor = new faceapi.LabeledFaceDescriptors(this.user?.fullName || 'unknown', descriptor)

      const maxDescriptorDistance = 0.6
      return new faceapi.FaceMatcher(labeledDescriptor, maxDescriptorDistance)
    }
  }
})
</script>
