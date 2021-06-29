import { readonly, ref } from 'vue'

type AlertType = 'info' | 'success' | 'warning' | 'error' | null

const message = ref<null | string>(null)
const alertType = ref<AlertType>(null)
const isVisible = ref(false)

export default function useSnackbar() {
  /**
   * Display the message on the snackbar
   * @param value the message to be displayed
   */
  function setSnackbarMessage(
    value: string,
    type: AlertType = 'info',
    ms = 5000
  ) {
    isVisible.value = true
    message.value = value
    alertType.value = type
    if (ms !== 0) {
      setTimeout(() => {
        clearSnackbarMessage()
      }, ms)
    }
  }

  /**
   * Hide the snackbar
   */
  function clearSnackbarMessage() {
    isVisible.value = false
  }

  return {
    message: readonly(message),
    alertType: readonly(alertType),
    setSnackbarMessage,
    clearSnackbarMessage,
    isVisible
  }
}
