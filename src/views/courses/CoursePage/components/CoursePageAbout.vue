<template>
  <AppPanel class="px-4 py-5">
    <AppLabel emphasis>About course</AppLabel>
    <div class="text-sm">
      <slot></slot>
    </div>
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
