<template>
  <button :disabled="loading" :class="prominent ? 'primary' : 'secondary'">
    <div class="flex justify-center" v-if="loading">
      <LoadingWheel class="w-5 h-5" />
    </div>
    <div v-else class="content">
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
    }
  }
})
</script>

<style lang="postcss" scoped>
button {
  @apply transition-colors duration-300 ease-in-out rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none;
}

button.primary {
  @apply text-white bg-green-500 active:bg-green-300;
}

button.secondary {
  @apply bg-gray-300 text-gray-600 active:bg-gray-200 dark:active:bg-gray-500 dark:text-gray-400 dark:bg-gray-700;
}

button div.content {
  @apply mx-6 my-2 text-sm font-semibold capitalize pointer-events-none;
}
</style>
