<template>
  <div
    class="
      flex
      items-center
      py-1
      px-2
      text-red-600
      rounded-md
      border
      dark:text-red-300
      bg-red-400/20
      border-red-600/20
      dark:bg-red-800/10
      dark:border-red-300/10
    "
  >
    <ExclamationIcon class="w-4 h-4 fill-current" />
    <div class="ml-1 text-sm"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'FormError',
  components: { ExclamationIcon }
})
</script>
