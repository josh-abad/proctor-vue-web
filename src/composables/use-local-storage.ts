import { Ref, ref, watchEffect } from 'vue'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const data = ref(initialValue) as Ref<T>

  const storedData = localStorage.getItem(key)
  if (storedData) {
    data.value = isString(data.value) ? storedData : JSON.parse(storedData)
  }

  function isString(x: unknown): x is string {
    return typeof x === 'string'
  }

  watchEffect(() => {
    localStorage.setItem(
      key,
      isString(data.value) ? data.value : JSON.stringify(data.value)
    )
  })

  return data
}
