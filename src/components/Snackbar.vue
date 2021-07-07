<template>
  <div
    class="overflow-hidden fixed top-0 right-0 duration-200 ease-in-out z-20"
    :class="isVisible ? 'translate-y-0' : 'translate-x-full'"
  >
    <div
      class="
        flex
        m-10
        rounded-lg
        shadow-lg
        dark:border
        bg-gray-900/70
        backdrop-blur
        dark:bg-gray-700/60
        dark:border-white/10
      "
    >
      <div class="flex object-cover items-center pl-5">
        <InformationCircleIcon
          class="w-7 h-7 text-indigo-400"
          v-if="alertType === 'info'"
        />

        <CheckCircleIcon
          class="w-7 h-7 text-green-400"
          v-else-if="alertType === 'success'"
        />

        <ExclamationIcon
          class="w-7 h-7 text-yellow-400"
          v-else-if="alertType === 'warning'"
        />

        <ExclamationCircleIcon
          class="w-7 h-7 text-red-400"
          v-else-if="alertType === 'error'"
        />
      </div>
      <div class="flex items-center py-4 px-5">
        <div class="font-semibold text-white">
          {{ message }}
        </div>
        <button
          aria-label="Dismiss Snackbar"
          @click="clearSnackbarMessage"
          class="ml-12 focus:outline-none"
        >
          <XIcon class="w-5 h-5 fill-current text-white/50" />
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
