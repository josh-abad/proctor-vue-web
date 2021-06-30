<template>
  <li class="py-2 last:pb-0">
    <div class="flex justify-between items-start">
      <div class="flex items-center">
        <AppSkeleton class="w-6 h-6 rounded-r-full rounded-l-full" />
        <AppSkeleton class="ml-2 w-36 h-5 first:ml-0" />
      </div>
      <AppSkeleton class="w-32 h-3" />
    </div>
    <div class="flex items-center mt-2 space-x-2">
      <AppSkeleton class="flex items-center w-32 h-3" />
      <AppSkeleton class="mt-1 w-20 h-3" />
    </div>
    <AppSkeleton class="mt-1 w-60 h-3" />
    <AppSkeleton class="mt-1 w-52 h-3" />
    <AppSkeleton class="mt-5 w-20 h-6" />
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
