<template>
  <AppPanel class="px-4 py-5">
    <AppSkeleton class="w-20 h-3" />
    <div class="mt-4 space-y-1">
      <AppSkeleton class="w-30 h-2" />
      <AppSkeleton class="w-30 h-2 mr-5" />
      <AppSkeleton class="w-30 h-2" />
      <AppSkeleton class="w-30 h-2 mr-5" />
    </div>
    <div class="mt-4 space-y-1">
      <AppSkeleton class="w-20 h-2" />
      <AppSkeleton class="w-30 h-2" />
    </div>
    <div class="mt-4 flex items-center">
      <AppSkeleton class="w-10 h-10 rounded-full" />
      <div class="ml-2 space-y-1">
        <AppSkeleton class="w-32 h-3" />
        <AppSkeleton class="w-20 h-2" />
      </div>
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
