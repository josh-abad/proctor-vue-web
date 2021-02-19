<template>
  <div class="date-picker" v-click-outside="closeModal">
    <BaseButton class="date-picker-btn" @click="isOpen = !isOpen">
      <!-- Heroicon name: calendar -->
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
    <transition name="dropdown-fade">
      <Calendar
        :model-value="modelValue"
        @update:model-value="handleUpdate"
        @date-pick="closeModal"
        class="date-picker__dropdown"
        v-show="isOpen"
        compact
      />
    </transition>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import BaseButton from './BaseButton.vue'
import Calendar from '@/components/Calendar/Calendar.vue'

export default defineComponent({
  name: 'DatePicker',
  components: { BaseButton, Calendar },
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
  },
  methods: {
    closeModal (): void {
      this.isOpen = false
    },
    handleUpdate (date: string): void {
      this.$emit('update:modelValue', date)
    }
  }
})
</script>

<style lang="postcss" scoped>
.date-picker {
  @apply relative;
}

.date-picker-btn {
  @apply flex items-center space-x-1 font-semibold text-base shadow bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-3 py-2;
}

.date-picker-btn__icon {
  @apply w-4 h-4 fill-current;
}

.date-picker__dropdown {
  @apply mt-2 origin-top-right z-30 w-80 absolute right-0 shadow-xl;
}
</style>
