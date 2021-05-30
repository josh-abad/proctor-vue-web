<template>
  <router-link
    :to="url"
    class="mx-2 text-gray-600  dark:text-gray-400 hover:text-green-500 dark:hover:text-white"
  >
    <div class="flex wrapper sm:hidden" @click="handleMobileNav">
      <slot name="icon" />
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
    <div class="hidden wrapper sm:flex">
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
  name: 'NavLink',
  props: {
    url: {
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
.router-link-active {
  @apply bg-green-300 dark:bg-gray-700 rounded-lg bg-opacity-30 dark:bg-opacity-30 font-semibold text-green-500 dark:text-white;
}

.wrapper {
  @apply items-center px-6 py-2 my-1;
}
</style>
