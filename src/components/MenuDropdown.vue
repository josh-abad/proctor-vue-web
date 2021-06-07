<template>
  <transition name="dropdown-fade" v-show="modelValue">
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
    modelValue: {
      type: Boolean,
      default: false
    },
    toggleId: {
      type: String,
      default: 'dropdown-toggle'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleClickOutside = useClickOutside(() => {
      emit('update:modelValue', false)
    }, props.toggleId)

    return {
      handleClickOutside
    }
  }
})
</script>

<style lang="postcss" scoped>
.dropdown-menu {
  @apply origin-top-right z-30 absolute right-0 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-700;
}
</style>
