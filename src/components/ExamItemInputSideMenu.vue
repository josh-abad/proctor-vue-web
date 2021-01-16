<template>
  <div class="p-2 dark:bg-gray-700 dark:bg-opacity-40 rounded-lg shadow">
    <div>
      <button class="button-input" @click="$emit('discard')">
        <!-- Heroicon name: trash -->
        <svg
          class="stroke-current w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
    <div>
      <button class="button-input" @click="$emit('add-question')">
        <!-- Heroicon name: plus-circle -->
        <svg
          class="stroke-current w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExamItemInputSideMenu',
  emits: ['discard', 'add-question']
})
</script>

<style lang="postcss" scoped>
.button-input {
  @apply focus:outline-none text-gray-500;
}
</style>
