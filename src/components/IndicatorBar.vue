<template>
  <teleport to="#modals">
    <div
      class="
        fixed
        z-20
        flex
        items-center
        justify-between
        sm:justify-start
        px-4
        py-2
        space-x-10
        w-full
        sm:w-auto
        sm:bottom-auto
        border-t
        sm:border
        sm:rounded-b-lg
        sm:border-t-0
        shadow-lg
        bottom-0
        sm:top-14
        sm:right-4
        backdrop-blur
        border-white/10
        bg-white/50
        dark:bg-gray-800/50
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndicatorBar',
  inheritAttrs: false
})
</script>
