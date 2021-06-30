<template>
  <router-link
    :to="href"
    active-class="text-green-500 rounded-lg dark:text-green-400 bg-green-300/20 dark:bg-green-900/30"
    class="
      mx-3
      text-sm
      font-medium
      text-gray-700
      dark:text-gray-400
      hover:text-green-500
      group
      dark:hover:text-green-400
    "
    v-slot="{ isActive }"
  >
    <div class="flex sm:hidden content" @click="handleMobileNav">
      <div
        class="
          w-6
          h-6
          text-gray-400
          group-hover:text-green-500
          dark:text-gray-400/50
          dark:group-hover:text-green-400
        "
        :class="
          isActive
            ? 'text-green-500 dark:text-green-400'
            : 'text-gray-400 dark:text-gray-400/50'
        "
      >
        <slot name="icon" />
      </div>
      <div class="ml-6">
        <slot name="label" />
      </div>
    </div>
    <div class="hidden items-center py-1 px-3 my-1 sm:flex">
      <div
        class="
          w-6
          h-6
          group-hover:text-green-500
          dark:group-hover:text-green-400
        "
        :class="
          isActive
            ? 'text-green-500 dark:text-green-400'
            : 'text-gray-400 dark:text-gray-400/50'
        "
      >
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
