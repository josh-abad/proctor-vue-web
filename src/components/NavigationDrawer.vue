<template>
  <aside
    class="transform navigation-drawer top-14"
    :class="{ '-translate-x-full': !isOpen, 'top-28': banner }"
  >
    <nav class="flex flex-col space-y-1">
      <slot></slot>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationDrawer',
  props: {
    isOpen: Boolean,

    banner: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="postcss" scoped>
.navigation-drawer {
  @apply fixed z-10 w-full min-h-full pt-4 overflow-y-auto duration-300 transition-transform ease-in-out bg-gray-100 sm:w-56 dark:bg-gray-900;
  @apply shadow-lg dark:shadow-none;
}
</style>
