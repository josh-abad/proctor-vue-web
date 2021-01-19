<template>
  <router-link
    :to="url"
    class="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-white border-l-2 border-gray-100 dark:border-gray-800"
    v-slot="{ isActive }"
  >
    <div class="flex items-center px-6 py-2 my-1">
      <svg
        class="w-5 h-5"
        :class="isActive ? 'fill-current' : 'stroke-current'"
        :fill="isActive ? 'currentColor' : 'none'"
        :viewBox="`0 0 ${isActive ? '20 20' : '24 24'}`"
      >
        <slot v-if="isActive" name="icon-selected"></slot>
        <slot v-else name="icon"></slot>
      </svg>
      <div class="ml-6">
        <slot name="label"></slot>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarLink',
  props: {
    url: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-gray-300 dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-40 font-semibold text-green-500 dark:text-white border-green-500 dark:border-green-500;
}
</style>
