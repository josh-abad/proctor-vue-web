<template>
  <router-link :to="href" class="navigation-item">
    <div class="flex content sm:hidden" @click="handleMobileNav">
      <slot name="icon" />
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
    <div class="hidden content sm:flex">
      <slot name="icon" />
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationItem',
  props: {
    href: {
      type: String,
      default: ''
    }
  },
  emits: ['mobile-nav'],
  methods: {
    handleMobileNav() {
      this.$emit('mobile-nav')
    }
  }
})
</script>

<style lang="postcss" scoped>
.navigation-item {
  @apply mx-2 text-gray-600  dark:text-gray-400 hover:text-green-500 dark:hover:text-white;
}

.router-link-active {
  @apply bg-green-300 dark:bg-gray-700 rounded-lg bg-opacity-30 dark:bg-opacity-30 font-semibold text-green-500 dark:text-white;
}

.content {
  @apply items-center px-4 py-2 my-1;
}
</style>
