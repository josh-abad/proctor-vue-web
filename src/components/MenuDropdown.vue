<template>
  <transition name="dropdown-fade">
    <div
      class="origin-top-right z-30 absolute right-0 w-56 rounded-lg shadow-lg bg-white dark:bg-dark-08 bg-opacity-50 dark:bg-opacity-75 backdrop-blur"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuDropdown'
})
</script>

<style lang="postcss" scoped>
.dropdown-bg {
  @apply origin-top-right z-10 absolute right-0 -mt-24 mr-20 w-56 rounded-lg shadow-lg bg-white dark:bg-dark-08 bg-opacity-50 dark:bg-opacity-75;
}
</style>
