<template>
  <div>
    <BaseButton @click="modalOpen = true" :prominent="prominent"
      ><slot></slot
    ></BaseButton>
    <teleport to="#modals">
      <DialogModal
        v-show="modalOpen"
        :action-label="actionLabel"
        :header="header"
        :message="message"
        @cancel="modalOpen = false"
        @confirm="$emit('confirm')"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'
import DialogModal from './DialogModal.vue'

export default defineComponent({
  name: 'ModalButton',
  components: { BaseButton, DialogModal },
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
    }
  },
  emits: ['confirm'],
  data () {
    return {
      modalOpen: false
    }
  }
})
</script>
