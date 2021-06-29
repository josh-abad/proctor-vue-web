<template>
  <div
    class="fixed top-0 right-0 overflow-hidden duration-200 ease-in-out"
    :class="isVisible ? 'translate-y-0' : 'translate-x-full'"
  >
    <div
      class="
        flex
        m-10
        bg-gray-900/70
        rounded-lg
        shadow-lg
        dark:bg-gray-700/60
        dark:border dark:border-white/10
        backdrop-blur
      "
    >
      <div class="flex items-center object-cover pl-5">
        <InformationCircleIcon
          class="text-indigo-400 w-7 h-7"
          v-if="alertType === 'info'"
        />

        <CheckCircleIcon
          class="text-green-400 w-7 h-7"
          v-else-if="alertType === 'success'"
        />

        <ExclamationIcon
          class="text-yellow-400 w-7 h-7"
          v-else-if="alertType === 'warning'"
        />

        <ExclamationCircleIcon
          class="text-red-400 w-7 h-7"
          v-else-if="alertType === 'error'"
        />
      </div>
      <div class="flex items-center px-5 py-4">
        <div class="font-semibold text-white">
          {{ message }}
        </div>
        <button @click="clearSnackbarMessage" class="ml-12 focus:outline-none">
          <XIcon class="w-5 h-5 text-white/50 fill-current" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSnackbar from '@/composables/use-snackbar'
import {
  XIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Snackbar',
  components: {
    XIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationIcon,
    ExclamationCircleIcon
  },
  setup() {
    const { message, alertType, clearSnackbarMessage, isVisible } =
      useSnackbar()

    return {
      message,
      alertType,
      isVisible,
      clearSnackbarMessage
    }
  }
})
</script>
