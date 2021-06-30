<template>
  <div>
    <AppSkeleton class="w-32 h-3" />
    <List class="mt-2">
      <li
        v-for="i in 3"
        :key="i"
        class="flex justify-between items-center py-5 w-full"
      >
        <div class="flex">
          <AppSkeleton class="w-5 h-5" />
          <div class="ml-4">
            <AppSkeleton class="w-32 h-5" />
            <AppSkeleton class="mt-2 w-40 h-3" />
          </div>
        </div>
        <div class="flex mx-6">
          <AppSkeleton class="w-10 h-5" />
          <AppSkeleton class="ml-4 w-10 h-5" />
        </div>
      </li>
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import List from '@/components/List.vue'

export default defineComponent({
  name: 'SkeletonAttemptsList',
  components: { AppSkeleton, List }
})
</script>
