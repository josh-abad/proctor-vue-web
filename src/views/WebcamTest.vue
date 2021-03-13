<template>
  <div class="p-4">
    <teleport to="#modals">
      <div
        class="fixed bottom-0 right-0 z-20 flex px-4 py-2 mr-8 space-x-2 bg-gray-700 rounded-t-lg shadow-lg"
      >
        <Webcam
          @no-face-seen="handleNoFaceSeen"
          @unidentified-face="handleUnidentifiedFace"
          :detection-duration="10"
          :debug="debug"
          :hide-video="!video"
        />
        <div class="inline-flex items-center text-red-400">
          <!-- Heroicon name: exclamation -->
          <svg class="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ warnings }}
        </div>
      </div>
    </teleport>
    <AppPanel>
      <div class="flex flex-col items-start">
        <AppButton @click="warnings = 0">Reset Warnings</AppButton>
        <ToggleButton v-model="debug" label="Debug" />
        <ToggleButton v-model="video" label="Show Video" />
      </div>
      <div v-for="i in 25" :key="i">foo</div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import ToggleButton from '@/components/ui/AppSwitch.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import { ALERT } from '@/store/action-types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WebcamTest',
  components: { AppButton, Webcam, AppPanel, ToggleButton },
  data () {
    return {
      warnings: 0,
      debug: false,
      video: false
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
