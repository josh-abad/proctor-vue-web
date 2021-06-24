import { computed, ref, watch } from 'vue'
import useTimer from './use-timer'

export default function useExtension(
  id: string,
  flaggedSites: string[] = [],
  onFlag?: (site: string) => void,
  onTimeout?: (site: string) => void
) {
  const isInstalled = ref(false)
  const isTrackingOn = ref(false)
  const sitesVisited = ref<{ time: string; url: string }[]>([])
  let port: chrome.runtime.Port | undefined

  try {
    port = chrome.runtime.connect(id, { name: 'Squid' })
    isInstalled.value = true
  } catch (error) {
    isInstalled.value = false
  }

  port?.postMessage('installed?')

  port?.onMessage.addListener(response => {
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

  const timer = useTimer(() => {
    currentSite.value && onTimeout?.(currentSite.value)
    timer.start()
  }, 10000)

  watch(currentSite, (currentSite, lastSite) => {
    if (currentSite !== lastSite) {
      timer.stop()
    }

    if (flaggedSites.some(site => currentSite?.includes(site))) {
      currentSite && onFlag?.(currentSite)
      timer.start()
    } else {
      timer.stop()
    }
  })

  const enableTracking = () => {
    port?.postMessage('on')
  }

  const disableTracking = () => {
    port?.postMessage('off')
  }

  return {
    lastVisitedSite,
    currentSite,
    isInstalled,
    isTrackingOn,
    sitesVisited,
    enableTracking,
    disableTracking
  }
}
