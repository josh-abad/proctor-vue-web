<template>
  <DropdownFadeTransition v-show="modelValue">
    <div
      class="
        absolute
        right-0
        z-30
        w-56
        bg-white
        rounded-lg
        shadow-lg
        origin-top-right
        dark:bg-gray-700
      "
      v-click-outside="handleClickOutside"
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
  </DropdownFadeTransition>
</template>

<script lang="ts">
import useClickOutside from '@/composables/use-click-outside'
import { defineComponent } from 'vue'
import DropdownFadeTransition from './transitions/DropdownFadeTransition.vue'

export default defineComponent({
  name: 'MenuDropdown',
  components: { DropdownFadeTransition },
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
