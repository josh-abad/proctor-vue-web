<template>
  <div>
    {{ faceSeen ? "Face detected" : "No face detected" }}
    {{ multipleFacesSeen }}
    {{ multipleFacesSeen === 1 ? "face" : "faces" }} detected
    <video ref="video" width="220" height="60" autoplay muted />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions, TNetInput } from 'face-api.js'
import { ALERT } from '@/store/action-types'

export default defineComponent({
  name: 'Webcam',
  data () {
    return {
      faceSeen: false,
      multipleFacesSeen: 0
    }
  },
  async mounted () {
    await faceapi.loadTinyFaceDetectorModel('./models')

    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then(stream => ((this.$refs.video as HTMLMediaElement).srcObject = stream))
      .catch(error => this.$store.dispatch(ALERT, error))

    const input = this.$refs.video as HTMLMediaElement
    input.addEventListener('play', () => {
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(input as TNetInput, new TinyFaceDetectorOptions())
        this.faceSeen = !!detections.length
        this.multipleFacesSeen = detections.length
      }, 100)
    })
  }
})
</script>
