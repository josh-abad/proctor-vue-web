<template>
  <AppPanel class="px-4 py-4">
    <AppLabel emphasis>About course</AppLabel>
    <p class="mt-2 text-sm">
      <slot></slot>
    </p>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'

export default defineComponent({
  name: 'CoursePageAbout',
  components: { AppLabel, AppPanel }
})
</script>
