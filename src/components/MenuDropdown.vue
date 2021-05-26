<template>
  <transition name="dropdown-fade">
    <div class="dropdown-menu" v-click-outside="handleClickOutside">
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
import useClickOutside from '@/composables/use-click-outside'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuDropdown',
  props: {
    toggleId: {
      type: String,
      default: 'dropdown-toggle'
    }
  },
  emits: ['click-outside'],
  setup (props, { emit }) {
    const handleClickOutside = useClickOutside(() => {
      emit('click-outside')
    }, props.toggleId)

    return {
      handleClickOutside
    }
  }
})
</script>

<style lang="postcss" scoped>
.dropdown-menu {
  @apply origin-top-right z-30 absolute right-0 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-800 dark:border-gray-100 border-opacity-10 dark:border-opacity-10;
}
</style>
