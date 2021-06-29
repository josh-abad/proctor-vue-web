<template>
  <li class="py-2 last:pb-0">
    <div class="flex items-start justify-between">
      <div class="flex items-center">
        <AppSkeleton class="w-6 h-6 rounded-l-full rounded-r-full" />
        <AppSkeleton class="h-5 ml-2 first:ml-0 w-36" />
      </div>
      <AppSkeleton class="w-32 h-3" />
    </div>
    <div class="flex items-center mt-2 space-x-2">
      <AppSkeleton class="flex items-center w-32 h-3" />
      <AppSkeleton class="w-20 h-3 mt-1" />
    </div>
    <AppSkeleton class="h-3 mt-1 w-60" />
    <AppSkeleton class="h-3 mt-1 w-52" />
    <AppSkeleton class="w-20 h-6 mt-5" />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from './ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonCourseActivityItem',
  components: { AppSkeleton }
})
</script>
