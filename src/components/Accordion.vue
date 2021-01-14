<template>
  <div>
    <div
      class="flex items-center pt-4 pb-2 border-b border-gray-300 dark:border-gray-700"
    >
      <div
        @click="expanded = !expanded"
        class="cursor-pointer dark:text-gray-400 dark:hover:text-white"
      >
        <!-- Heroicon name: chevron-right -->
        <svg
          class="w-5 h-5 mb-1 transform ease-in-out duration-100"
          viewBox="0 0 20 20"
          fill="currentColor"
          :class="expanded ? 'rotate-90' : 'rotate-0'"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <BaseLabel class="ml-2 mb-0" emphasis>{{ label }}</BaseLabel>
    </div>
    <div
      class="duration-100 ease-in-out transform"
      :class="
        expanded
          ? 'py-4 opacity-100 translate-y-0'
          : 'py-0 opacity-0 -translate-y-2'
      "
    >
      <div v-show="expanded">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'

export default defineComponent({
  name: 'Accordion',
  components: { BaseLabel },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      expanded: true
    }
  }
})
</script>
