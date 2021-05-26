<template>
  <div class="guide-item">
    <DetectionIndicator class="small-icon" />
    <p class="description">Camera disabled</p>
  </div>
  <div class="guide-item">
    <DetectionIndicator class="small-icon" on />
    <p class="description">Camera enabled</p>
  </div>
  <div class="guide-item">
    <DetectionIndicator class="small-icon" on detected />
    <p class="description">
      Camera <span class="text-white">detects</span> a person
    </p>
  </div>
  <div class="guide-item">
    <DetectionIndicator class="small-icon" on detected identified />
    <p class="description">
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

<style lang="postcss" scoped>
.guide-item {
  @apply flex;
}

.small-icon {
  @apply w-5 h-5;
}

.description {
  @apply text-sm text-gray-300 ml-2;
}
</style>
