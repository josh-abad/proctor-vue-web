<template>
  <div class="flex flex-row-reverse sm:block">
    <div class="progress-bar__bg">
      <div :style="`width: ${percentage}%`" class="progress-bar__progress" />
    </div>
    <div class="label hidden sm:block">
      <span class="label__percentage">{{ percentage }}%</span> complete
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

<style lang="postcss" scoped>
.progress-bar__bg {
  @apply bg-gray-200 dark:bg-gray-700 w-full h-2 rounded-full overflow-hidden;
}

.progress-bar__progress {
  @apply bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full;
}

.label {
  @apply text-sm mt-2;
}

.label__percentage {
  @apply font-semibold;
}
</style>
