<template>
  <div class="flex">
    <DetectionIndicator class="w-5 h-5" />
    <p class="ml-2 text-sm text-gray-300">Camera disabled</p>
  </div>
  <div class="flex">
    <DetectionIndicator class="w-5 h-5" on />
    <p class="ml-2 text-sm text-gray-300">Camera enabled</p>
  </div>
  <div class="flex">
    <DetectionIndicator class="w-5 h-5" on detected />
    <p class="ml-2 text-sm text-gray-300">
      Camera <span class="text-white">detects</span> a person
    </p>
  </div>
  <div class="flex">
    <DetectionIndicator class="w-5 h-5" on detected identified />
    <p class="ml-2 text-sm text-gray-300">
      Camera <span class="text-green-400">identifies</span> you
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DetectionIndicator from './DetectionIndicator.vue'

export default defineComponent({
  name: 'DetectionIndicatorGuide',
  components: { DetectionIndicator }
})
</script>
