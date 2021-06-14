<template>
  <div>
    <AppSkeleton class="w-56 h-4" />
    <AppSkeleton class="w-48 h-8 mt-4" />
    <AppSkeleton class="w-64 h-4 mt-4" />
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
