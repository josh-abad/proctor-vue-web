<template>
  <div class="space-y-2">
    <div v-for="i in 10" :key="i">
      <div class="py-2 label-border">
        <AppSkeleton class="h-2 w-28" />
      </div>
      <div class="flex items-center justify-between py-3">
        <div class="flex">
          <AppSkeleton class="w-5 h-3 mr-2" />
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
