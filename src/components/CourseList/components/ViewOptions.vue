<template>
  <div class="options">
    <ViewToggle
      :model-value="modelValue"
      @update:model-value="handleSelect"
      value="card"
    >
      <!-- Heroicon name: view-grid -->
      <svg class="options__icon" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm6-6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </ViewToggle>
    <ViewToggle
      :model-value="modelValue"
      @update:model-value="handleSelect"
      value="list"
    >
      <!-- Heroicon name: view-list -->
      <svg class="options__icon" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </ViewToggle>
  </div>
</template>

<script lang="ts">
import ViewToggle from '@/components/ViewToggle.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ViewOptions',
  components: { ViewToggle },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleSelect (viewMode: 'card' | 'list'): void {
      this.$emit('update:modelValue', viewMode)
    }
  }
})
</script>

<style lang="postcss" scoped>
.options {
  @apply flex items-center space-x-3;
}

.options__icon {
  @apply w-5 h-5 fill-current;
}
</style>
