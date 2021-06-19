import { Ref, ref } from '@vue/reactivity'
import * as faceapi from 'face-api.js'

const MODELS_URL = '/models'

const getFaceMatcher = async (referenceImageUrl: string, name: string) => {
  const img = await faceapi.fetchImage(encodeURI(referenceImageUrl))
  const detection = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks(true)
    .withFaceDescriptor()

  if (!detection) {
    throw new Error(`No face detected for ${name}.`)
  }

  const labeledDescriptor = new faceapi.LabeledFaceDescriptors(name, [
    detection.descriptor
  ])

  return new faceapi.FaceMatcher(labeledDescriptor)
}

interface FaceDetectionOptions {
  intervalDuration?: number
  inputSize?: number
  faceRecognition?: {
    name: string
    referenceImageUrl: string
  }
}

export default function useFaceDetection({
  intervalDuration = 300,
  inputSize = 128,
  faceRecognition
}: FaceDetectionOptions) {
  const isFaceSeen = ref(false)
  const isFaceIdentified = ref(false)
  const isLoading = ref(false)
  const hasLoaded = ref(false)
  const error = ref(false)
  const faceMatcher = ref() as Ref<faceapi.FaceMatcher | undefined>
  const handleDetection = ref<() => void>()
  const interval = ref<number>()

  const loadModels = async () => {
    try {
      isLoading.value = true
      await Promise.all([
        faceapi.loadTinyFaceDetectorModel(MODELS_URL),
        faceapi.loadFaceLandmarkTinyModel(MODELS_URL),
        faceapi.loadFaceRecognitionModel(MODELS_URL)
      ])
      hasLoaded.value = true
    } catch (_error) {
      error.value = true
    } finally {
      isLoading.value = false
    }
  }

  const loadFaceDetection = () => {
    loadModels().then(() => {
      if (faceRecognition) {
        const { name, referenceImageUrl } = faceRecognition
        getFaceMatcher(referenceImageUrl, name).then(createdFaceMatcher => {
          faceMatcher.value = createdFaceMatcher
        })
      }
    })
  }

  const startDetection = (video: HTMLMediaElement) => {
    if (!handleDetection.value) {
      handleDetection.value = () => {
        interval.value = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              video as faceapi.TNetInput,
              new faceapi.TinyFaceDetectorOptions({ inputSize })
            )
            .withFaceLandmarks(true)
            .withFaceDescriptors()

          isFaceSeen.value = detections.length !== 0

          if (faceRecognition) {
            const [identifiedFace] = detections.map(({ descriptor }) =>
              faceMatcher.value?.findBestMatch(descriptor).toString()
            )
            const { name } = faceRecognition
            isFaceIdentified.value = identifiedFace
              ? identifiedFace.includes(name)
              : false
          }
        }, intervalDuration)
      }
    }
    return handleDetection.value
  }

  const stopDetection = () => {
    clearInterval(interval.value)
    interval.value = undefined
  }

  return {
    isFaceSeen,
    isFaceIdentified,
    isLoadingModels: isLoading,
    hasLoadedModels: hasLoaded,
    startDetection,
    stopDetection,
    loadFaceDetection
  }
}
