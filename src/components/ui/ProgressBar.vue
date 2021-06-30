<template>
  <div class="flex flex-row-reverse sm:block">
    <div
      class="
        overflow-hidden
        w-full
        h-1.5
        bg-green-200
        rounded-full
        dark:bg-green-900
      "
    >
      <div
        :style="`width: ${percentage}%`"
        class="h-full bg-green-500 rounded-full duration-500 ease-out"
      />
    </div>
    <div class="hidden mt-2 text-sm sm:block">
      <span class="font-semibold">{{ percentage }}%</span> complete
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
