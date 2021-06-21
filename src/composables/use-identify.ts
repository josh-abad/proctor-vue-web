import { ref, Ref, watchEffect } from 'vue'
import useTimer from './use-timer'

export default function useIdentify(identified: Ref<boolean>, duration = 5000) {
  const isInvalid = ref(false)
  const isIdentified = ref(false)
  const isIdentifying = ref(false)

  const timer = useTimer(() => {
    isIdentified.value = true
    isIdentifying.value = false
    timer.stop()
  }, duration)

  watchEffect(() => {
    if (!isIdentified.value) {
      if (identified.value) {
        isIdentifying.value = true
        timer.start()
      } else {
        isIdentifying.value = false
        timer.stop()
      }
    }
  })

  const reset = () => {
    isInvalid.value = false
    isIdentified.value = false
    isIdentifying.value = false
  }

  return {
    isInvalid,
    isIdentified,
    isIdentifying,
    reset
  }
}
