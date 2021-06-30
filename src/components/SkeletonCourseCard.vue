<template>
  <div
    class="overflow-hidden w-full bg-white rounded-lg shadow dark:bg-gray-700"
  >
    <AppSkeleton class="w-full h-14 rounded-b-none" />
    <div class="py-4 px-4 space-y-2">
      <AppSkeleton class="w-40 h-3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonCourseCard',
  components: { AppSkeleton }
})
</script>
