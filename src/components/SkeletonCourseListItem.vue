<template>
  <div class="flex justify-between items-center py-3" v-once>
    <div class="flex">
      <AppSkeleton class="w-16 h-16 sm:w-32 sm:h-20" />
      <div class="ml-3 space-y-2">
        <AppSkeleton class="w-32 h-3" />
        <AppSkeleton class="w-40 h-3" />
        <AppSkeleton class="w-52 h-2 rounded-full sm:hidden" />
      </div>
    </div>
    <div class="hidden space-y-2 sm:block">
      <AppSkeleton class="w-52 h-2 rounded-full" />
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
