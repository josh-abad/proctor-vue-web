<template>
  <aside
    class="
      fixed
      z-10
      w-full
      min-h-full
      pt-4
      overflow-y-auto
      transition-transform
      duration-300
      ease-in-out
      bg-gray-100
      sm:w-56
      dark:bg-gray-900
      dark:shadow-none
      top-14
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
