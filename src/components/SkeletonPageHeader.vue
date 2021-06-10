<template>
  <div>
    <AppSkeleton class="w-56 h-5" />
    <div class="flex justify-between mt-2">
      <AppSkeleton class="w-48 h-8" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from './ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonPageHeader',
  components: { AppSkeleton }
})
</script>
