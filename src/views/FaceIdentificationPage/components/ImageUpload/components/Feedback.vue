<template>
  <div>
    <div v-if="loading">
      <div class="inline-flex items-center text-sm">
        <LoadingWheel class="mr-1 w-4 h-4" />
        Detecting face
      </div>
    </div>
    <div
      v-else
      class="inline-flex items-center"
      :class="valid ? 'text-green-300' : 'text-red-300'"
    >
      <CheckIcon class="w-4 h-4 fill-current" v-if="valid" />
      <XIcon class="w-4 h-4 fill-current" v-else />
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
import { CheckIcon, XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Feedback',
  components: { LoadingWheel, CheckIcon, XIcon },
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
