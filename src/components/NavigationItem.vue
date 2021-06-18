<template>
  <router-link :to="href" class="navigation-item group" v-slot="{ isActive }">
    <div class="flex content sm:hidden" @click="handleMobileNav">
      <div class="icon" :class="{ isActive }">
        <slot name="icon" />
      </div>
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
    <div class="hidden content sm:flex">
      <div class="icon" :class="{ isActive }">
        <slot name="icon" />
      </div>
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
  @apply mx-3 text-gray-700 text-sm dark:text-gray-400 font-medium hover:text-green-500 dark:hover:text-green-400;
}

.router-link-active,
.icon.isActive {
  @apply text-green-500 dark:text-green-400;
}

.router-link-active {
  @apply bg-green-300 dark:bg-green-900 rounded-lg bg-opacity-20 dark:bg-opacity-30;
}

.content {
  @apply items-center px-3 py-1 my-1;
}

.icon {
  @apply w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-green-500 dark:group-hover:text-green-400;
}
</style>
