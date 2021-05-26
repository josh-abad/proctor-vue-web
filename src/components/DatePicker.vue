<template>
  <div class="date-picker" v-click-outside="closeModal">
    <AppButton class="date-picker-btn" @click="isOpen = !isOpen">
      <CalendarIcon class="date-picker-btn__icon" />
      <div class="date-picker-btn__selected">
        {{ dateSelected ? formattedDate : "Select Date" }}
      </div>
    </AppButton>
    <transition name="dropdown-fade">
      <Calendar
        :model-value="modelValue"
        @update:modelValue="handleUpdate"
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
import AppButton from './ui/AppButton.vue'
import Calendar from '@/components/Calendar/Calendar.vue'
import { CalendarIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'DatePicker',
  components: { AppButton, Calendar, CalendarIcon },
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
    closeModal () {
      this.isOpen = false
    },
    handleUpdate ($event: string | undefined) {
      if ($event !== undefined) {
        this.$emit('update:modelValue', $event)
      }
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
