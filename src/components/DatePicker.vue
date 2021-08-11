<template>
  <div class="relative" v-click-outside="closeModal">
    <button
      class="
        flex
        items-center
        py-2
        px-3
        text-sm
        bg-gray-100
        rounded-lg
        border border-gray-300
        shadow
        dark:bg-gray-800
        dark:border-gray-700
        focus:outline-none
      "
      @click="isOpen = !isOpen"
    >
      <div class="date-picker-btn__selected">
        {{ dateSelected ? formattedDate : 'Select Date' }}
      </div>
      <CalendarIcon class="ml-4 w-4 h-4" />
    </button>
    <DropdownFadeTransition>
      <Calendar
        v-model="date"
        @date-pick="closeModal"
        class="absolute z-30 mt-2 w-80 shadow-xl origin-top-right"
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
import useModelWrapper from '@/composables/use-model-wrapper'

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
  setup(props, { emit }) {
    const date = useModelWrapper(props, emit, 'modelValue')

    return {
      date
    }
  },
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
    }
  }
})
</script>
