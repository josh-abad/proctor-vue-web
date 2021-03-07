<template>
  <div
    class="shadow overflow-hidden bg-white dark:bg-gray-700 rounded-lg w-full h-25"
  >
    <AppSkeleton class="w-full h-20 rounded-b-none" />
    <div class="space-y-2 px-4 py-4">
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
