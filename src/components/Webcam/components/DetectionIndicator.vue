<template>
  <div class="w-10 h-10 text-gray-500">
    <EyeIcon
      v-if="on"
      :class="{
        'text-white': detected,
        'text-green-500': identified
      }"
    />
    <EyeOffIcon v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'DetectionIndicator',
  components: { EyeIcon, EyeOffIcon },
  props: {
    on: {
      type: Boolean,
      default: false
    },

    detected: {
      type: Boolean,
      default: false
    },

    identified: {
      type: Boolean,
      default: false
    }
  }
})
</script>
