<template>
  <aside
    class="transform navigation-drawer"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <nav class="flex flex-col">
      <slot></slot>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationDrawer',
  props: {
    isOpen: Boolean
  }
})
</script>

<style lang="postcss" scoped>
.navigation-drawer {
  @apply fixed z-10 w-full min-h-full pt-4 overflow-y-auto duration-300 transition-transform ease-in-out bg-gray-200 sm:w-56 dark:bg-gray-900;
}
</style>
