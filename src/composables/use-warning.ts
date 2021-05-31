import { computed, ref, watch } from 'vue'

interface WarningOptions {
  maximum: number
  onWarn?: () => void
  onExceed?: () => void
}

export default function useWarning({
  maximum,
  onWarn,
  onExceed
}: WarningOptions) {
  const warnings = ref(0)
  const maxWarnings = ref(maximum)

  const warningsExceeded = computed(() => {
    return warnings.value === maxWarnings.value
  })

  const warningsLeft = computed(() => {
    return maxWarnings.value - warnings.value
  })

  watch(warningsExceeded, isExceeded => {
    if (onExceed !== undefined && isExceeded) {
      onExceed()
    }
  })

  const warn = (skipCallback = false) => {
    if (!warningsExceeded.value) {
      warnings.value++
      // if (Notification.permission === 'granted') {
      //   const notification = new Notification('Return to exam')
      //   notification.addEventListener('click', () => {
      //     window.focus()
      //   })
      // } else {
      //   Notification.requestPermission()
      // }
      if (!skipCallback && onWarn !== undefined) {
        onWarn()
      }
    }
  }

  return {
    warnings,
    warningsExceeded,
    warningsLeft,
    maxWarnings,
    warn
  }
}
