<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="open">
      <div class="modal" v-click-outside="{ handler: closeModal, middleware }">
        <header class="modal-header">
          <slot name="header">Dialog Header</slot>
        </header>
        <section class="modal-body">
          <slot name="body">Dialog body text</slot>
        </section>
        <footer class="modal-footer">
          <BaseButton @click="closeModal">Cancel</BaseButton>
          <slot name="action" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  name: 'AppModal',
  components: { BaseButton },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  watch: {
    open (isOpen: boolean): void {
      if (isOpen) {
        const body = document.querySelector('body')
        if (body) {
          body.classList.add('overflow-hidden')
        }
      }
    }
  },
  methods: {
    closeModal (): void {
      this.$emit('close')
      const body = document.querySelector('body')
      if (body) {
        body.classList.remove('overflow-hidden')
      }
    },
    middleware (e: Event): boolean {
      return (e.target as Element).id !== 'btn-open'
    }
  }
})
</script>

<style lang="postcss" scoped>
.modal-backdrop {
  @apply fixed z-30 top-0 bottom-0 left-0 bg-gray-900 bg-opacity-30 w-full h-full flex justify-center items-center;
}

.modal {
  @apply overflow-x-auto flex flex-col bg-dark-06 rounded-lg shadow-2xl;
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
