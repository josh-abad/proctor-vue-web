<template>
  <router-link
    :to="href"
    class="w-full py-2 text-center hover:text-gray-900 dark:hover:text-white"
    active-class="font-semibold text-gray-900 active dark:text-white"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    href: {
      type: String,
      default: '#'
    }
  }
})
</script>
