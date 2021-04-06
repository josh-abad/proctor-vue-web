<template>
  <div class="icon">
    <EyeIcon
      v-if="on"
      :class="{
        'icon-detected': detected,
        'icon-identified': identified,
      }"
    />
    <EyeOffIcon v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'EyeIcon',
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

<style lang="postcss" scoped>
.icon {
  @apply w-10 h-10 text-gray-500;
}

.icon-detected {
  @apply text-white;
}

.icon-identified {
  @apply text-green-500;
}
</style>
