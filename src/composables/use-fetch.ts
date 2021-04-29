import { Ref, ref } from 'vue'

export default function useFetch<T> (fetchFn: () => Promise<T>, defaultValue: T | null = null) {
  const data = ref(defaultValue) as Ref<T>
  const loading = ref(false)
  const error = ref(false)

  const fetch = async () => {
    try {
      loading.value = true
      data.value = await fetchFn()
    } catch (e) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return [data, fetch, loading, error] as const
}
