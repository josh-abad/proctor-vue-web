<template>
  <router-link
    :to="href"
    role="tab"
    v-slot="{ isActive }"
    :aria-selected="isActive"
    class="py-2 w-full text-center hover:text-gray-900 dark:hover:text-white"
    active-class="font-semibold text-gray-900 dark:text-white active"
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
