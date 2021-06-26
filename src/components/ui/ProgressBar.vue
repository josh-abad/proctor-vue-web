<template>
  <div class="flex flex-row-reverse sm:block">
    <div
      class="
        bg-green-200
        dark:bg-green-900
        w-full
        h-1.5
        rounded-full
        overflow-hidden
      "
    >
      <div
        :style="`width: ${percentage}%`"
        class="h-full duration-500 ease-out bg-green-500 rounded-full"
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
