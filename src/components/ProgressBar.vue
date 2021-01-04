<template>
  <div>
    <div
      class="bg-gray-300 dark:bg-gray-700 w-full h-2 rounded-full overflow-hidden"
    >
      <div
        :style="`width: ${percentage}%`"
        class="bg-gradient-to-r from-green-600 to-green-400 percentage h-full rounded-full"
      />
    </div>
    <div class="text-sm">
      <span class="font-semibold">{{ percentage }}</span
      >% complete
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      required: true
    }
  }
})
</script>
