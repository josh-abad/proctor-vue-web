<template>
  <ScrimFadeTransition v-show="modelValue">
    <div
      class="
        flex
        fixed
        top-0
        bottom-0
        left-0
        z-30
        justify-center
        items-center
        w-full
        h-full
        transition-opacity
        bg-gray-900/50
      "
    >
      <ModalFadeTransition v-show="modelValue">
        <div
          class="
            flex
            overflow-x-auto
            flex-col
            bg-gray-100
            rounded-lg
            shadow-2xl
            transition-all
            dark:bg-gray-700
            modal
          "
          v-bind="$attrs"
          v-click-outside="handleClickOutside"
        >
          <header class="flex p-4 text-lg font-semibold">
            <slot name="header">Dialog Header</slot>
          </header>
          <section class="px-4 pb-4 text-gray-400">
            <slot name="body">Dialog body text</slot>
          </section>
          <footer class="flex justify-end p-4 space-x-2">
            <AppButton @click="closeModal">Cancel</AppButton>
            <slot name="action" />
          </footer>
        </div>
      </ModalFadeTransition>
    </div>
  </ScrimFadeTransition>
</template>

<script lang="ts">
import useClickOutside from '@/composables/use-click-outside'
import { defineComponent } from 'vue'
import AppButton from './AppButton.vue'
import ScrimFadeTransition from '../transitions/ScrimFadeTransition.vue'
import ModalFadeTransition from '../transitions/ModalFadeTransition.vue'

export default defineComponent({
  name: 'AppModal',
  components: { AppButton, ScrimFadeTransition, ModalFadeTransition },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },

    clickOutsideId: {
      type: String,
      default: 'btn-open'
    }
  },
  emits: ['update:modelValue', 'close'],
  inheritAttrs: false,
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:modelValue', false)
      emit('close')
      const body = document.querySelector('body')
      if (body) {
        body.classList.remove('overflow-hidden')
      }
    }

    const handleClickOutside = useClickOutside(closeModal, props.clickOutsideId)

    return {
      closeModal,
      handleClickOutside
    }
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) {
        document.body.classList.add('overflow-hidden')
      }
    }
  },
  unmounted() {
    document.body.classList.remove('overflow-hidden')
  }
})
</script>

<style lang="postcss" scoped>
.modal::-webkit-scrollbar {
  width: 14px;
}

.modal::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.modal::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  @apply bg-white/20;
}
</style>
