<template>
  <button
    :disabled="loading"
    :class="{ primary: prominent, secondary: !prominent && !danger, danger }"
  >
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
    },

    danger: {
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
  @apply text-white bg-indigo-500 active:bg-indigo-300 hover:bg-indigo-400;
}

button.secondary {
  @apply bg-gray-900 bg-opacity-10 text-gray-600;
  @apply dark:bg-white dark:bg-opacity-10 dark:text-gray-400;
  @apply hover:bg-opacity-20 dark:hover:bg-opacity-20;
  @apply active:bg-opacity-30 dark:active:bg-opacity-30;
}

button div.content {
  @apply mx-4 my-2 text-sm font-semibold capitalize pointer-events-none;
}

button.danger {
  @apply bg-red-500 text-white active:bg-red-300 hover:bg-red-400;
}
</style>
