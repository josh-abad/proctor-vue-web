<template>
  <div class="mt-4 flex justify-start space-x-4 w-full">
    <SkeletonCourseCard />
    <SkeletonCourseCard />
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
