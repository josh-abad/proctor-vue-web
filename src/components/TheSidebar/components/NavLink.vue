<template>
  <router-link
    :to="url"
    class="text-gray-600 transition-colors duration-200 ease-in-out border-l-2 border-gray-800 border-opacity-0 dark:text-gray-400 hover:text-green-500 dark:hover:text-white"
    v-slot="{ isActive }"
  >
    <div class="flex wrapper sm:hidden" @click="handleMobileNav">
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
    <div class="hidden wrapper sm:flex">
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
  name: 'NavLink',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  emits: ['mobile-nav'],
  methods: {
    handleMobileNav (): void {
      this.$emit('mobile-nav')
    }
  }
})
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-gray-200 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-30 font-semibold text-green-500 dark:text-white border-green-500;
}

.wrapper {
  @apply items-center px-6 py-2 my-1;
}
</style>
