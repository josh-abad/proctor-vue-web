<template>
  <div class="space-y-2">
    <div v-for="i in 10" :key="i">
      <div class="py-2 label-border">
        <AppSkeleton class="w-28 h-2" />
      </div>
      <div class="py-3 flex items-center justify-between">
        <div class="flex">
          <AppSkeleton class="mr-2 w-5 h-3" />
          <AppSkeleton class="w-32 h-3" />
        </div>
        <SVGCheckbox :model-value="false" static-check />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import SVGCheckbox from '@/components/SVGCheckbox.vue'

export default defineComponent({
  name: 'Fallback',
  components: {
    AppSkeleton,
    SVGCheckbox
  }
})
</script>
