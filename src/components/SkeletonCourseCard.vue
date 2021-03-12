<template>
  <div
    class="w-full overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700"
  >
    <AppSkeleton class="w-full rounded-b-none h-14" />
    <div class="px-4 py-4 space-y-2">
      <AppSkeleton class="w-32 h-3" />
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
