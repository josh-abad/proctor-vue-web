import { reactive, readonly, ref } from 'vue'

export default function useModal () {
  const isOpen = ref(false)

  function close () {
    isOpen.value = false
  }

  function open () {
    isOpen.value = true
  }

  function toggle () {
    isOpen.value = !isOpen.value
  }

  return reactive({
    isOpen: readonly(isOpen),
    close,
    open,
    toggle
  })
}
