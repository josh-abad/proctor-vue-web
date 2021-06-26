<template>
  <button
    :disabled="loading"
    class="
      transition-colors
      duration-300
      ease-in-out
      rounded-lg
      focus:outline-none
      disabled:opacity-50
      disabled:pointer-events-none
    "
    :class="{
      'text-white bg-indigo-500 active:bg-indigo-300 hover:bg-indigo-400':
        prominent,
      'bg-gray-900/10 text-gray-600 dark:bg-white/10 dark:text-gray-400 hover:bg-gray-900/20 dark:hover:bg-white/20 active:bg-gray-900/30 dark:active:bg-white/30':
        !prominent && !danger,
      'bg-red-500 text-white active:bg-red-300 hover:bg-red-400': danger
    }"
  >
    <div class="flex justify-center" v-if="loading">
      <LoadingWheel class="w-5 h-5" />
    </div>
    <div
      v-else
      class="mx-4 my-2 text-sm font-semibold capitalize pointer-events-none"
    >
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingWheel from '../LoadingWheel.vue'

export default defineComponent({
  name: 'AppButton',
  components: { LoadingWheel },
  props: {
    prominent: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    danger: {
      type: Boolean,
      default: false
    }
  }
})
</script>
