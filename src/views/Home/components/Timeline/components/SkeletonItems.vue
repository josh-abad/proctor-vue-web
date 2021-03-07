<template>
  <div class="mt-4 space-y-2">
    <SkeletonItem v-for="i in 5" :key="i" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonItem from './SkeletonItem.vue'

export default defineComponent({
  name: 'SkeletonItems',
  components: { SkeletonItem }
})
</script>
