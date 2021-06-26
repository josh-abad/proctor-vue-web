<template>
  <div class="relative" v-click-outside="closeModal">
    <button
      class="
        rounded-lg
        focus:outline-none
        flex
        items-center
        text-sm
        shadow
        bg-gray-100
        dark:bg-gray-800
        border border-gray-300
        dark:border-gray-700
        px-3
        py-2
      "
      @click="isOpen = !isOpen"
    >
      <div class="date-picker-btn__selected">
        {{ dateSelected ? formattedDate : 'Select Date' }}
      </div>
      <CalendarIcon class="w-4 h-4 ml-4" />
    </button>
    <DropdownFadeTransition>
      <Calendar
        :model-value="modelValue"
        @update:modelValue="handleUpdate"
        @date-pick="closeModal"
        class="mt-2 origin-top-right z-30 w-80 absolute shadow-xl"
        v-show="isOpen"
        compact
      />
    </DropdownFadeTransition>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'
import Calendar from '@/components/Calendar/Calendar.vue'
import { CalendarIcon } from '@heroicons/vue/outline'
import DropdownFadeTransition from './transitions/DropdownFadeTransition.vue'

export default defineComponent({
  name: 'DatePicker',
  components: { Calendar, CalendarIcon, DropdownFadeTransition },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    formattedDate(): string {
      return dayjs(this.modelValue).format('D MMM YYYY')
    },
    dateSelected(): boolean {
      return this.formattedDate !== 'Invalid Date'
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false
    },
    handleUpdate($event: string | undefined) {
      if ($event !== undefined) {
        this.$emit('update:modelValue', $event)
      }
    }
  }
})
</script>
