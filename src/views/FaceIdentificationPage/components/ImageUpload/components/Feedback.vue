<template>
  <div>
    <div v-if="loading">
      <div class="inline-flex items-center text-sm">
        <LoadingWheel class="mr-1" />
        Detecting face
      </div>
    </div>
    <div
      v-else
      class="inline-flex items-center"
      :class="valid ? 'text-green-300' : 'text-red-300'"
    >
      <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
        <!-- Heroicon name: check -->
        <path
          v-if="valid"
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
        <!-- Heroicon name: x -->
        <path
          v-else
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="ml-1 text-sm">
        <div v-if="valid">Face detected</div>
        <div v-else>No face detected in image</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingWheel from '@/components/LoadingWheel.vue'

export default defineComponent({
  name: 'Feedback',
  components: { LoadingWheel },
  props: {
    valid: {
      type: Boolean,
      required: true
    },

    loading: {
      type: Boolean,
      required: true
    }
  }
})
</script>
