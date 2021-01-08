<template>
  <transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div class="fixed z-30 inset-0 overflow-y-auto" v-show="!dialog.closed">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
          ></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          v-show="!dialog.closed"
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: exclamation -->
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-headline"
                >
                  {{ dialog.header }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ dialog.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <BaseButton @click="handleConfirm" prominent>{{
              dialog.actionLabel
            }}</BaseButton>
            <BaseButton @click="handleCancel" class="mr-3"> Cancel </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { CLOSE_DIALOG } from '@/store/mutation-types'
import { DialogContent } from '@/types'
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  name: 'DialogModal',
  computed: {
    dialog (): DialogContent {
      return this.$store.state.dialog.dialog
    }
  },
  methods: {
    handleConfirm () {
      this.$store.commit(CLOSE_DIALOG)
      this.$emitter.emit('closedDialog', true)
    },
    handleCancel () {
      this.$store.commit(CLOSE_DIALOG)
      this.$emitter.emit('closedDialog', false)
    }
  }
})
</script>
