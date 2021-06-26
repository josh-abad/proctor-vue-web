<template>
  <AppPanel class="px-4 py-4">
    <AppSkeleton class="w-20 h-3" />
    <div class="mt-4 space-y-1">
      <AppSkeleton class="h-2 w-30" />
      <AppSkeleton class="h-2 mr-5 w-30" />
      <AppSkeleton class="h-2 w-30" />
      <AppSkeleton class="h-2 mr-5 w-30" />
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'

export default defineComponent({
  name: 'CoursePageAbout',
  components: {
    AppPanel,
    AppSkeleton
  }
})
</script>
