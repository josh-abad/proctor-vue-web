import useLocalStorage from './use-local-storage'

const isDemoModeEnabled = useLocalStorage('demoMode', false)

export default function useDemoMode() {
  return {
    isDemoModeEnabled
  }
}
