<template>
  <aside
    class="
      fixed
      z-10
      w-full
      h-auto
      pt-4
      pb-4
      overflow-y-auto
      transition-transform
      duration-300
      ease-in-out
      bg-gray-100
      border-b
      top-14
      sm:border-b-0
      dark:border-white/10
      sm:pb-0
      sm:min-h-full
      sm:w-56
      dark:bg-gray-900/90
      backdrop-blur
      dark:shadow-none
    "
    :class="{
      '-translate-y-full sm:translate-y-0 sm:-translate-x-full': !isOpen,
      'top-28': banner
    }"
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
