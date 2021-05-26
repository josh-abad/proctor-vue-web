import { readonly, ref } from 'vue'

const message = ref<null | string>()

export default function useSnackbar () {

  /**
   * Display the message on the snackbar
   * @param value the message to be displayed
   */
  function setSnackbarMessage (value: string, ms = 5000) {
    message.value = value
    setTimeout(() => {
      clearSnackbarMessage()
    }, ms)
  } 

  /**
   * Hide the snackbar
   */
  function clearSnackbarMessage () {
    message.value = null
  }

  return {
    message: readonly(message),
    setSnackbarMessage,
    clearSnackbarMessage
  }
}
