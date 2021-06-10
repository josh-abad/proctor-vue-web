<template>
  <AppButton
    v-bind="$attrs"
    id="btn-open"
    @click="modal = true"
    :prominent="prominent"
    :danger="danger"
  >
    <slot></slot>
  </AppButton>
  <teleport to="#modals">
    <AppModal v-model="modal">
      <template #header>{{ header }}</template>
      <template #body>{{ message }}</template>
      <template #action>
        <AppButton
          @click="$emit('confirm')"
          :prominent="!danger"
          :danger="danger"
        >
          {{ actionLabel }}
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'

export default defineComponent({
  name: 'ModalButton',
  components: { AppButton, AppModal },
  inheritAttrs: false,
  props: {
    actionLabel: {
      type: String,
      default: 'Confirm'
    },

    header: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    prominent: {
      type: Boolean,
      default: false
    },

    danger: {
      type: Boolean,
      default: false
    }
  },
  emits: ['confirm'],
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  }
})
</script>
