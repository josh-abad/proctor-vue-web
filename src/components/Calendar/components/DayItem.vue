<template>
  <li
    class="h-full border-t border-gray-700"
    :class="{
      'text-gray-500': !isCurrentMonth,
      'font-semibold text-green-500': isToday,
      'p-1': compact,
      'p-4': !compact,
    }"
  >
    <div class="flex justify-center items-center">
      <div
        class="box-border p-4 flex justify-center items-center rounded-full cursor-pointer"
        :class="{
          'font-semibold text-white bg-green-500 bg-opacity-50':
            modelValue === day.date,
          'w-2 h-2 text-sm': compact,
          'w-5 h-5 text-base': !compact,
          'bg-red-500 bg-opacity-50 text-white':
            hasEvent && modelValue !== day.date,
        }"
        @click="$emit('update:modelValue', day.date)"
      >
        {{ label }}
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'
import compactMixin from '@/mixins/compact'

export default defineComponent({
  name: 'DayItem',
  mixins: [compactMixin],
  props: {
    modelValue: {
      type: String,
      default: ''
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
    label (): string {
      return dayjs(this.day.date).format('D')
    }
  }
})
</script>
