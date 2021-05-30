<template>
  <div class="p-4">
    <teleport to="#modals">
      <div
        class="fixed bottom-0 right-0 z-20 flex px-4 py-2 mr-8 space-x-2 bg-gray-700 rounded-t-lg shadow-lg"
      >
        <Webcam
          @no-face-seen="handleNoFaceSeen"
          @unidentified-face="handleUnidentifiedFace"
          :duration="10"
          :debug="debug"
          :show-video="video"
        />
        <div class="inline-flex items-center text-red-400">
          <ExclamationIcon class="w-10 h-10" />
          {{ warnings }}
        </div>
      </div>
    </teleport>
    <AppPanel>
      <div class="flex flex-col items-start">
        <AppButton @click="warnings = 0">Reset Warnings</AppButton>
        <AppSwitch v-model="debug" label="Debug" />
        <AppSwitch v-model="video" label="Show Video" />
      </div>
      <div v-for="i in 25" :key="i">foo</div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/solid'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'WebcamTest',
  components: { AppButton, Webcam, AppPanel, AppSwitch, ExclamationIcon },
  setup () {
    const { setSnackbarMessage } = useSnackbar()

    return {
      setSnackbarMessage
    }
  },
  data () {
    return {
      warnings: 0,
      debug: false,
      video: false
    }
  },
  methods: {
    handleNoFaceSeen () {
      this.warnings++
      this.setSnackbarMessage('No face seen for 10 seconds.', 'warning')
    },
    handleUnidentifiedFace () {
      this.warnings++
      this.setSnackbarMessage('Face unidentified for 10 seconds', 'warning')
    }
  }
})
</script>
