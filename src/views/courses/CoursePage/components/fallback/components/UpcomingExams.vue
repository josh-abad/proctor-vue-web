<template>
  <AppPanel class="px-3 py-4">
    <AppSkeleton class="w-32 h-3" />
    <div class="mt-4">
      <div v-for="i in 5" :key="i" class="flex py-1 space-x-2">
        <AppSkeleton class="w-4 h-4" />
        <AppSkeleton class="h-3" :class="i % 2 === 0 ? 'w-32' : 'w-28'" />
      </div>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'UpcomingEvents',
  components: {
    AppPanel,
    AppSkeleton
  }
})
</script>
