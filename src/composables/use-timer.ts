import { computed, onUnmounted, reactive, readonly, ref, watchEffect } from 'vue'

/**
 * A reactive timer that can be paused and resumed.
 * @param callback The function that will be executed when the timer finishes
 * @param duration How long the timer will run (in milliseconds)
 * @returns the remaining duration and status of the timer, as well as methods to control it
 */
export default function useTimer (callback: () => void, duration: number) {
  const intervalId = ref<number | null>(null)
  const remaining = ref(duration)
  const status = ref<'active' | 'stopped' | 'paused'>('stopped')

  const startTimer = () => {
    status.value = 'active'
  }

  const stopTimer = () => {
    status.value = 'stopped'
    remaining.value = duration
  }

  const pauseTimer = () => {
    status.value = 'paused'
  }

  watchEffect(() => {
    if (status.value === 'active') {
      intervalId.value = window.setInterval(() => {
        remaining.value -= 1000
        if (remaining.value === 0) {
          status.value = 'stopped'
        }
      }, 1000)
    } else if (intervalId.value) {
      clearInterval(intervalId.value)
    }
  })

  watchEffect(() => {
    if (status.value === 'stopped' && remaining.value === 0) {
      callback()
      remaining.value = duration
    }
  })

  onUnmounted(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
    }
  })

  const remainingTime = computed(() => {
    return Math.floor(remaining.value / 1000)
  })

  return reactive({
    pause: pauseTimer,
    stop: stopTimer,
    start: startTimer,
    status: readonly(status),
    remainingTime: readonly(remainingTime)
  })
}
