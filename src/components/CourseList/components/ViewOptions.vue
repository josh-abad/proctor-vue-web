<template>
  <div class="options">
    <ViewToggle
      :model-value="modelValue"
      @update:modelValue="handleSelect"
      value="card"
    >
      <ViewGridIcon class="options__icon" />
    </ViewToggle>
    <ViewToggle
      :model-value="modelValue"
      @update:modelValue="handleSelect"
      value="list"
    >
      <ViewListIcon class="options__icon" />
    </ViewToggle>
  </div>
</template>

<script lang="ts">
import ViewToggle from '@/components/ViewToggle.vue'
import { defineComponent } from 'vue'
import { ViewGridIcon, ViewListIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'ViewOptions',
  components: { ViewToggle, ViewGridIcon, ViewListIcon },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleSelect($event: string | undefined) {
      if ($event !== undefined) {
        this.$emit('update:modelValue', $event)
      }
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
