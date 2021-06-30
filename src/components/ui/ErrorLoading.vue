<template>
  <div class="flex flex-col items-center py-10 w-full text-gray-500">
    <ExclamationIcon class="w-8 h-8" />
    <span class="mt-4">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'ErrorLoading',
  components: {
    ExclamationIcon
  },
  props: {
    message: {
      type: String,
      default: 'Something went wrong.'
    }
  }
})
</script>
