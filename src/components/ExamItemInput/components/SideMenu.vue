<template>
  <div class="space-y-2">
    <button @click="$emit('discard')">
      <TrashIcon class="w-5 h-5" />
    </button>
    <button @click="$emit('add-question')">
      <PlusCircleIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TrashIcon, PlusCircleIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'SideMenu',
  components: { TrashIcon, PlusCircleIcon },
  emits: ['discard', 'add-question']
})
</script>

<style lang="postcss" scoped>
button {
  @apply block focus:outline-none text-gray-500;
}
</style>
