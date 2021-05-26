<template>
  <div class="flex flex-col items-center w-full py-4 text-gray-500">
    <ExclamationIcon class="w-7 h-7" />
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/solid'

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
