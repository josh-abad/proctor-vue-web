<template>
  <div>
    <BaseButton class="date-picker-btn" @click="isOpen = true">
      <svg
        class="date-picker-btn__icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="date-picker-btn__selected">
        {{ dateSelected ? formattedDate : "Select Date" }}
      </div>
    </BaseButton>
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
import CalendarMonth from '@/components/Calendar/Calendar.vue'

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
      return dayjs(this.modelValue).format('D MMM YYYY')
    },
    dateSelected (): boolean {
      return this.formattedDate !== 'Invalid Date'
    }
  }
})
</script>

<style lang="postcss" scoped>
.date-picker-btn {
  @apply flex items-center space-x-1 font-semibold text-base shadow bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2;
}

.date-picker-btn__icon {
  @apply w-4 h-4 fill-current;
}
</style>
