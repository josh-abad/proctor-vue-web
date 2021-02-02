<template>
  <div class="flex justify-between items-center pt-3 mt-3 animate-pulse" v-once>
    <div class="flex">
      <div class="w-40 h-20 shadow bg-gray-600 rounded" />
      <div class="ml-3">
        <div class="w-32 h-3 bg-gray-600 rounded" />
        <div class="mt-2 w-40 h-3 bg-gray-600 rounded" />
      </div>
    </div>
    <div>
      <div class="w-60 h-3 bg-gray-600 rounded"></div>
      <div class="mt-2 w-24 h-3 bg-gray-600 rounded"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SkeletonCourseListItem'
})
</script>
