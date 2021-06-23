import { computed, ref, watchEffect } from 'vue'

export default function useExtension(
  id: string,
  flaggedSites: string[] = [],
  onFlag?: () => void
) {
  const isInstalled = ref(false)
  const isTrackingOn = ref(false)
  const sitesVisited = ref<{ time: string; url: string }[]>([])

  const port = chrome.runtime.connect(id, { name: 'Squid' })

  port.postMessage('installed?')

  port.onMessage.addListener(response => {
    console.log(response)
    isInstalled.value = response !== null
    isTrackingOn.value = response?.tracking
    if (response.sitesVisited) {
      sitesVisited.value = response.sitesVisited
    }
  })

  const lastVisitedSite = computed(() => {
    return sitesVisited.value.length > 1
      ? sitesVisited.value[sitesVisited.value.length - 2].url
      : null
  })

  const currentSite = computed(() => {
    return sitesVisited.value.length > 0
      ? sitesVisited.value[sitesVisited.value.length - 1].url
      : null
  })

  watchEffect(() => {
    if (flaggedSites.some(site => currentSite.value?.includes(site))) {
      onFlag?.()
    }
  })

  return {
    lastVisitedSite,
    currentSite,
    isInstalled,
    isTrackingOn,
    sitesVisited
  }
}
