<template>
  <div
    class="fixed bottom-0 right-0 flex items-center px-5 py-4 mb-10 mr-10 overflow-auto overflow-x-hidden transition-transform duration-300 ease-in-out transform bg-gray-900 bg-opacity-50 rounded-lg shadow dark:bg-white dark:bg-opacity-50 backdrop-filter backdrop-blur"
    :class="message ? 'translate-y-0' : 'translate-x-52'"
  >
    <div class="mr-12 text-white dark:text-gray-900">
      {{ message }}
    </div>
    <button @click="dismiss" class="focus:outline-none">
      <XIcon class="w-5 h-5 text-gray-200 fill-current dark:text-gray-800" />
    </button>
  </div>
</template>

<script lang="ts">
import { SET_MESSAGE } from '@/store/mutation-types'
import { defineComponent } from 'vue'
import { XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Snackbar',
  components: { XIcon },
  computed: {
    message (): string {
      return this.$store.state.message
    }
  },
  methods: {
    dismiss () {
      this.$store.commit(SET_MESSAGE, '')
    }
  }
})
</script>
