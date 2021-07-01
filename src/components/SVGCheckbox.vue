<template>
  <button class="focus:outline-none cursor-default pointer-events-none">
    <div
      class="
        w-5
        h-5
        rounded
        border-2 border-gray-400
        dark:border-gray-600
        box-border
      "
      :class="{ 'border-green-500 dark:border-green-500': checked }"
    >
      <CheckIcon
        class="w-4 h-4 text-green-500 stroke-current stroke-2"
        v-show="checked"
      />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'SVGCheckbox',
  components: { CheckIcon },
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
})
</script>
