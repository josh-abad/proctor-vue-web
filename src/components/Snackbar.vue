<template>
  <div
    class="fixed bottom-0 right-0 overflow-hidden duration-300 ease-in-out"
    :class="message ? 'transform translate-y-0' : 'transform translate-x-52'"
  >
    <div class="flex m-10 bg-gray-700 rounded-lg shadow-lg dark:bg-white">
      <div class="flex items-center object-cover pl-5">
        <InformationCircleIcon
          class="text-white w-7 h-7"
          v-if="alertType === 'info'"
        />
        <CheckCircleIcon
          class="text-green-500 w-7 h-7"
          v-else-if="alertType === 'success'"
        />
        <ExclamationIcon
          class="text-[#f7d71e] w-7 h-7"
          v-else-if="alertType === 'warning'"
        />
        <ExclamationCircleIcon
          class="text-red-500 w-7 h-7"
          v-else-if="alertType === 'error'"
        />
      </div>
      <div class="flex items-center px-5 py-4">
        <div class="font-semibold text-white dark:text-gray-900">
          {{ message }}
        </div>
        <button @click="clearSnackbarMessage" class="ml-12 focus:outline-none">
          <XIcon class="w-5 h-5 text-gray-500 fill-current" />
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
} from '@heroicons/vue/solid'

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
    const { message, alertType, clearSnackbarMessage } = useSnackbar()

    return {
      message,
      alertType,
      clearSnackbarMessage
    }
  }
})
</script>
