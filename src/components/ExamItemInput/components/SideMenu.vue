<template>
  <div class="space-y-2">
    <button
      class="block text-gray-500 focus:outline-none"
      @click="$emit('discard')"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
    <button
      class="block text-gray-500 focus:outline-none"
      @click="$emit('add-question')"
    >
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
