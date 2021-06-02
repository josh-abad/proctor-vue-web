import { readonly, ref, watchEffect } from 'vue'

const title = ref(document.title)

export default function useTitle() {
  watchEffect(() => {
    document.title = title.value
  })

  const setTitle = (newTitle: string) => {
    title.value = newTitle
  }

  return { title: readonly(title), setTitle }
}
