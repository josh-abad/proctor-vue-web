import { onMounted, onUnmounted, Ref } from 'vue'
import useTimer from '@/composables/use-timer'
import { onBeforeRouteLeave } from 'vue-router'

interface KeepOnPageOptions {
  preventLeave: Ref<boolean>
  onLeaveAttempt?: () => void
  onLeaveFocus?: () => void
  onLeaveTimeout?: () => void
  onUnload?: () => void
}

export default function useKeepOnPage({
  preventLeave,
  onLeaveAttempt,
  onLeaveTimeout,
  onLeaveFocus,
  onUnload
}: KeepOnPageOptions) {
  const timer = useTimer(() => {
    if (onLeaveTimeout !== undefined) {
      onLeaveTimeout()
    }
    timer.start()
  }, 5000)

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const handleBlur = () => {
    if (onLeaveFocus !== undefined) {
      onLeaveFocus()
    }
    timer.start()
  }

  const clearListeners = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('blur', handleBlur)
    window.removeEventListener('focus', timer.stop)

    if (onUnload !== undefined) {
      window.removeEventListener('unload', onUnload)
    }
  }

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', timer.stop)

    if (onUnload !== undefined) {
      window.addEventListener('unload', onUnload)
    }
  })

  onUnmounted(() => {
    clearListeners()
  })

  onBeforeRouteLeave((to, from, next) => {
    if (preventLeave.value) {
      if (onLeaveAttempt !== undefined) {
        onLeaveAttempt()
      }
    } else {
      clearListeners()
      next()
    }
  })
}
