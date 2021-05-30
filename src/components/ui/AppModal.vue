<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="open">
      <div class="modal" v-click-outside="handleClickOutside">
        <header class="modal-header">
          <slot name="header">Dialog Header</slot>
        </header>
        <section class="modal-body">
          <slot name="body">Dialog body text</slot>
        </section>
        <footer class="modal-footer">
          <AppButton @click="closeModal">Cancel</AppButton>
          <slot name="action" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import useClickOutside from '@/composables/use-click-outside'
import { defineComponent } from 'vue'
import AppButton from './AppButton.vue'

export default defineComponent({
  name: 'AppModal',
  components: { AppButton },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close')
      const body = document.querySelector('body')
      if (body) {
        body.classList.remove('overflow-hidden')
      }
    }

    const handleClickOutside = useClickOutside(closeModal, 'btn-open')

    return {
      closeModal,
      handleClickOutside
    }
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) {
        const body = document.querySelector('body')
        if (body) {
          body.classList.add('overflow-hidden')
        }
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.modal-backdrop {
  @apply fixed z-30 top-0 bottom-0 left-0 bg-gray-900 bg-opacity-30 w-full h-full flex justify-center items-center;
}

.modal {
  @apply overflow-x-auto flex flex-col bg-gray-100 dark:bg-gray-700 rounded-lg shadow-2xl;
}

.modal-header,
.modal-footer {
  @apply flex p-4;
}

.modal-header {
  @apply font-semibold text-lg;
}

.modal-footer {
  @apply justify-end space-x-2;
}

.modal-body {
  @apply px-4 pb-4 text-gray-400;
}
</style>
