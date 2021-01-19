<template>
  <div>
    <BaseButton @click="isOpen = true">{{
      formattedDate === "Invalid Date" ? "Choose Date" : formattedDate
    }}</BaseButton>
    <teleport to="#modals">
      <transition name="modal-fade"
        ><div class="fixed z-30 inset-0 overflow-y-auto" v-show="isOpen">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >
            <div
              class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <CalendarMonth
                :model-value="modelValue"
                @update:model-value="
                  (newValue) => $emit('update:modelValue', newValue)
                "
                @date-pick="isOpen = false"
                compact
              />
            </div>
          </div></div
      ></transition>
    </teleport>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'
import CalendarMonth from './CalendarMonth.vue'

export default defineComponent({
  name: 'DatePicker',
  components: { BaseButton, CalendarMonth },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    formattedDate (): string {
      return dayjs(this.modelValue).format('MMMM D, YYYY')
    }
  }
})
</script>
