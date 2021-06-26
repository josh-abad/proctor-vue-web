<template>
  <div
    class="
      flex
      items-center
      px-2
      py-1
      text-red-600
      border
      rounded-md
      bg-red-400/20
      dark:bg-red-800/10
      border-red-600/20
      dark:border-red-300/10
      dark:text-red-300
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
