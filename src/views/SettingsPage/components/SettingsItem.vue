<template>
  <div class="flex justify-between items-center py-2">
    <span>
      <div>{{ name }}</div>
      <div class="text-xs font-semibold text-gray-500" v-if="description">
        {{ description }}
      </div>
    </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingsItem',
  props: {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: false
    }
  }
})
</script>
