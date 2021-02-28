<template>
  <section v-if="viewMode === 'card'" class="course-list--card-view">
    <SkeletonCourseCard :key="i" v-for="i in 10" />
  </section>
  <section v-else-if="viewMode === 'list'" class="separator-y">
    <SkeletonCourseListItem :key="i" v-for="i in 10" />
  </section>
</template>

<script lang="ts">
import SkeletonCourseListItem from '@/components/SkeletonCourseListItem.vue'
import SkeletonCourseCard from '@/components/SkeletonCourseCard.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Fallback',
  components: { SkeletonCourseListItem, SkeletonCourseCard },
  props: {
    viewMode: {
      type: String,
      default: 'list'
    }
  }
})
</script>

<style lang="postcss" scoped>
.course-list--card-view {
  @apply mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2;
}
</style>
