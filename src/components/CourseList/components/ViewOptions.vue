<template>
  <div class="flex items-center space-x-3" role="radiogroup">
    <ViewToggle aria-label="Card View" v-model="value" value="card">
      <ViewGridIcon class="w-5 h-5" />
    </ViewToggle>
    <ViewToggle aria-label="List View" v-model="value" value="list">
      <ViewListIcon class="w-5 h-5" />
    </ViewToggle>
  </div>
</template>

<script lang="ts">
import ViewToggle from '@/components/ViewToggle.vue'
import { defineComponent } from 'vue'
import { ViewGridIcon, ViewListIcon } from '@heroicons/vue/solid'
import useModelWrapper from '@/composables/use-model-wrapper'

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
  setup(props, { emit }) {
    const value = useModelWrapper(props, emit, 'modelValue')

    return {
      value
    }
  }
})
</script>
