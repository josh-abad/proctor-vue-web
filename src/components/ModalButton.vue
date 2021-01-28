<template>
  <div>
    <BaseButton id="btn-open" @click="modalOpen = true" :prominent="prominent"
      ><slot></slot
    ></BaseButton>
    <teleport to="#modals">
      <AppModal v-show="modalOpen" @close="modalOpen = false">
        <template #header>{{ header }}</template>
        <template #body>{{ message }}</template>
        <template #action>
          <BaseButton @click="$emit('confirm')" prominent>
            {{ actionLabel }}
          </BaseButton>
        </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppModal from './AppModal.vue'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  name: 'ModalButton',
  components: { BaseButton, AppModal },
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
