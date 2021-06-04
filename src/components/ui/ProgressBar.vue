<template>
  <div class="flex flex-row-reverse sm:block">
    <div class="progress-bar__bg">
      <div :style="`width: ${percentage}%`" class="progress-bar__progress" />
    </div>
    <div class="hidden label sm:block">
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
  @apply bg-green-200 dark:bg-green-900 w-full h-1.5 rounded-full overflow-hidden;
}

.progress-bar__progress {
  @apply bg-green-500 h-full rounded-full ease-out duration-500;
}

.label {
  @apply text-sm mt-2;
}

.label__percentage {
  @apply font-semibold;
}
</style>
