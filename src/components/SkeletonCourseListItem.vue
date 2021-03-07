<template>
  <div class="flex justify-between items-center pt-3 mt-3" v-once>
    <div class="flex">
      <AppSkeleton class="w-40 h-20" />
      <div class="ml-3 space-y-2">
        <AppSkeleton class="w-32 h-3" />
        <AppSkeleton class="w-40 h-3" />
      </div>
    </div>
    <div class="space-y-2">
      <AppSkeleton class="w-24 h-3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonCourseListItem',
  components: { AppSkeleton }
})
</script>
