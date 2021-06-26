<template>
  <div class="flex items-center space-x-3">
    <ViewToggle
      :model-value="modelValue"
      @update:modelValue="handleSelect"
      value="card"
    >
      <ViewGridIcon class="w-5 h-5" />
    </ViewToggle>
    <ViewToggle
      :model-value="modelValue"
      @update:modelValue="handleSelect"
      value="list"
    >
      <ViewListIcon class="w-5 h-5" />
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
