<template>
  <div class="flex items-center justify-between pt-3 mt-3" v-once>
    <div class="flex">
      <AppSkeleton class="w-16 h-16 sm:w-40 sm:h-20" />
      <div class="ml-3 space-y-2">
        <AppSkeleton class="w-32 h-3" />
        <AppSkeleton class="w-40 h-3" />
        <AppSkeleton class="h-2 rounded-full sm:hidden w-52" />
      </div>
    </div>
    <div class="hidden space-y-2 sm:block">
      <AppSkeleton class="h-2 rounded-full w-52" />
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
