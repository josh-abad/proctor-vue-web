<template>
  <div
    class="transform ease-in-out overflow-x-hidden overflow-auto transition-transform duration-300 fixed flex items-center bottom-0 right-0 px-5 py-4 mr-10 mb-10 bg-dark-00 dark:bg-white bg-opacity-50 dark:bg-opacity-50 backdrop-blur rounded-lg shadow"
    :class="message ? 'translate-y-0' : 'translate-x-52'"
  >
    <div class="mr-12 text-white dark:text-gray-900">
      {{ message }}
    </div>
    <button @click="dismiss" class="focus:outline-none">
      <svg
        viewBox="0 0 20 20"
        class="fill-current text-gray-200 dark:text-gray-800 h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { SET_MESSAGE } from '@/store/mutation-types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Snackbar',
  computed: {
    message (): string {
      return this.$store.state.alert.message
    }
  },
  methods: {
    dismiss () {
      this.$store.commit(SET_MESSAGE, '')
    }
  }
})
</script>
