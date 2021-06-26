<template>
  <AppPanel class="px-3 py-3 space-y-2">
    <AppSkeleton class="w-32 h-3" />
    <AppSkeleton class="w-full h-2 rounded-full" />
    <AppSkeleton class="w-20 h-2" />
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'CoursePageProgress',
  components: {
    AppPanel,
    AppSkeleton
  }
})
</script>
