import { ref } from 'vue'

export default function useVideo() {
  const video = ref<HTMLMediaElement | null>(null)
  const isEnabled = ref(false)
  const isLoading = ref(false)
  const error = ref(false)

  const startVideo = async () => {
    try {
      isLoading.value = true

      if (video.value === null) {
        throw new Error('Video element not found.')
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
      video.value.srcObject = stream
      video.value.play()
      isEnabled.value = true
    } catch (error) {
      error.value = true
    } finally {
      isLoading.value = false
    }
  }

  const stopVideo = () => {
    const stream = video.value?.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      isEnabled.value = false
    }
  }

  return {
    startVideo,
    stopVideo,
    isLoading,
    isEnabled,
    error,
    video
  }
}
