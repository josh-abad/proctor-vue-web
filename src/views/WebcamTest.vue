<template>
  <div class="p-4">
    <BasePanel>
      <Webcam
        @no-face-seen="handleNoFaceSeen"
        @unidentified-face="handleUnidentifiedFace"
        :detection-duration="10"
        debug
      />
      <div class="inline-flex items-center">
        <!-- Heroicon name: exclamation -->
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Warnings: {{ warnings }}
      </div>
      <BaseButton @click="warnings = 0">Reset Warnings</BaseButton>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BasePanel from '@/components/BasePanel.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import { ALERT } from '@/store/action-types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WebcamTest',
  components: { BaseButton, Webcam, BasePanel },
  data () {
    return {
      warnings: 0
    }
  },
  methods: {
    handleNoFaceSeen (): void {
      this.warnings++
      this.$store.dispatch(ALERT, 'No face seen for 10 seconds.')
    },
    handleUnidentifiedFace (): void {
      this.warnings++
      this.$store.dispatch(ALERT, 'Face unidentified for 10 seconds')
    }
  }
})
</script>
