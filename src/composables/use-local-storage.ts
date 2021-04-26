import { Ref, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'

export default function useLocalStorage<T> (key: string, initialValue: T) {
  const data = ref(initialValue) as Ref<T>

  const storedData = localStorage.getItem(key)
  if (storedData) {
    data.value = JSON.parse(storedData)
  }

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(data.value))
  })

  return data
}
