<template>
  <div class="py-1">
    <AppSkeleton class="w-40 h-3 mb-1" />
    <div class="flex space-x-1">
      <AppSkeleton class="w-5 h-5 mr-2" />
      <div class="space-y-1">
        <AppSkeleton class="w-32 h-3" />
        <AppSkeleton class="w-20 h-2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonItem',
  components: { AppSkeleton }
})
</script>
