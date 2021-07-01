<template>
  <router-link
    :to="href"
    active-class="text-green-500 rounded-lg dark:text-green-400 bg-green-300/20 dark:bg-green-900/30"
    class="
      mx-3
      font-medium
      text-gray-700
      sm:text-sm
      dark:text-gray-400
      hover:text-green-500
      group
      dark:hover:text-green-400
    "
    v-slot="{ isActive }"
  >
    <div class="flex px-3 py-1 my-1 sm:hidden" @click="handleMobileNav">
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
    <div class="items-center hidden px-3 py-1 my-1 sm:flex">
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
