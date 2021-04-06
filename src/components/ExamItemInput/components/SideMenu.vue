<template>
  <div class="p-2 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
    <div>
      <button class="button-input" @click="$emit('discard')">
        <TrashIcon class="w-5 h-5 stroke-current" />
      </button>
    </div>
    <div>
      <button class="button-input" @click="$emit('add-question')">
        <PlusCircleIcon class="w-5 h-5 stroke-current" />
      </button>
    </div>
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
.button-input {
  @apply focus:outline-none text-gray-500;
}
</style>
