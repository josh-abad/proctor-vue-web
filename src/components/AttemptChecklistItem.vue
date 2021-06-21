<template>
  <li class="flex items-center">
    <LoadingWheel class="w-6 h-6" v-if="loading" />
    <div class="circle" :class="{ enabled }" v-else>
      <CheckIcon class="w-4 h-4 text-white" v-if="enabled" />
    </div>
    <span class="ml-4" :class="{ loading, enabled }"><slot></slot></span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingWheel from './LoadingWheel.vue'
import { CheckIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'AttemptChecklistItem',
  components: { LoadingWheel, CheckIcon },
  props: {
    enabled: {
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
.circle {
  @apply flex items-center justify-center w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full;
}

.circle.enabled {
  @apply bg-green-500;
}

span.loading {
  @apply text-gray-500;
}

span.enabled {
  @apply text-gray-900 dark:text-white;
}
</style>
