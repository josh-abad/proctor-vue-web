<template>
  <transition name="scrim-fade" v-show="modelValue">
    <div class="modal-backdrop">
      <transition name="modal-fade" v-show="modelValue">
        <div class="modal" v-bind="$attrs" v-click-outside="handleClickOutside">
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
      </transition>
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
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:modelValue', false)
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
.modal-backdrop {
  @apply fixed z-30 top-0 bottom-0 left-0 bg-gray-900 bg-opacity-50 w-full h-full flex justify-center items-center transition-opacity;
}

.modal {
  @apply overflow-x-auto flex flex-col bg-gray-100 dark:bg-gray-700 rounded-lg shadow-2xl transition-all transform;
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

.modal-fade-enter-active {
  @apply duration-300 ease-out;
}

.modal-fade-leave-active {
  @apply duration-200 ease-in;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  @apply translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  @apply translate-y-0 opacity-100 sm:scale-100;
}

.scrim-fade-enter-active {
  @apply duration-300 ease-out;
}

.scrim-fade-leave-active {
  @apply duration-200 ease-in;
}

.scrim-fade-enter-from,
.scrim-fade-leave-to {
  @apply opacity-0;
}

.scrim-fade-enter-to,
.scrim-fade-leave-from {
  @apply opacity-100;
}
</style>
