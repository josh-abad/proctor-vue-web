import { readonly, ref } from 'vue'

type AlertType = 'info' | 'success' | 'warning' | 'error' | null

const message = ref<null | string>()
const alertType = ref<AlertType>(null)

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
    message.value = null
    alertType.value = null
  }

  return {
    message: readonly(message),
    alertType: readonly(alertType),
    setSnackbarMessage,
    clearSnackbarMessage
  }
}
