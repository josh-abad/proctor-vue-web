<template>
  <li
    id="btn-open"
    class="h-full border-t border-gray-300 cursor-pointer"
    :class="{
      'text-gray-500': !isCurrentMonth,
      'font-semibold text-green-500': isToday,
      'p-1 dark:border-gray-600': compact,
      'p-4 dark:border-gray-700': !compact
    }"
    @click="$emit('update:modelValue', day.date)"
  >
    <div class="flex justify-center items-center pointer-events-none">
      <div
        class="flex justify-center items-center p-4 rounded-full box-border"
        :class="{
          'font-semibold text-white bg-green-500 bg-opacity-50':
            modelValue === day.date,
          'w-2 h-2 text-sm': compact,
          'w-5 h-5 text-base': !compact,
          'bg-indigo-500 bg-opacity-50 text-white':
            hasEvent && modelValue !== day.date
        }"
      >
        {{ label }}
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DayItem',
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    compact: {
      type: Boolean,
      default: false
    },

    day: {
      type: Object as PropType<{ date: string; isCurrentMonth: boolean }>,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    },

    hasEvent: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    label(): string {
      return dayjs(this.day.date).format('D')
    }
  }
})
</script>
