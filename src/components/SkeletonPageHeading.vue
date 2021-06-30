<template>
  <div>
    <AppSkeleton class="w-56 h-4" />
    <AppSkeleton class="mt-4 w-48 h-8" />
    <AppSkeleton class="mt-4 w-64 h-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from './ui/AppSkeleton.vue'

export default defineComponent({
  name: 'SkeletonPageHeading',
  components: { AppSkeleton }
})
</script>
