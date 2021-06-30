<template>
  <aside
    class="
      overflow-y-auto
      fixed
      top-14
      z-10
      pt-4
      w-full
      min-h-full
      bg-gray-100
      transition-transform
      duration-300
      ease-in-out
      sm:w-56
      dark:bg-gray-900
      dark:shadow-none
    "
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
