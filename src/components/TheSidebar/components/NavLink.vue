<template>
  <router-link
    :to="url"
    class="text-gray-600 transition-colors duration-200 ease-in-out border-l-2 border-gray-800 border-opacity-0 dark:text-gray-400 hover:text-green-500 dark:hover:text-white"
    v-slot="{ isActive }"
  >
    <div class="flex wrapper sm:hidden" @click="handleMobileNav">
      <slot v-if="isActive" name="icon-selected" />
      <slot v-else name="icon" />
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
    <div class="hidden wrapper sm:flex">
      <slot v-if="isActive" name="icon-selected" />
      <slot v-else name="icon" />
      <div class="ml-6">
        <slot name="label" />
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
    handleMobileNav () {
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
