<template>
  <div class="flex justify-start w-full mt-4 space-x-4">
    <SkeletonCourseCard />
    <SkeletonCourseCard class="hidden sm:block" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonCourseCard from '@/components/SkeletonCourseCard.vue'

export default defineComponent({
  name: 'Fallback',
  components: { SkeletonCourseCard }
})
</script>
