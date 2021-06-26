<template>
  <div
    class="overflow-hidden bg-gray-100 rounded-lg shadow-lg"
    :class="compact ? 'dark:bg-gray-700' : 'dark:bg-gray-800'"
  >
    <div
      class="flex items-center justify-between bg-indigo-500"
      :class="compact ? 'p-3' : 'p-6'"
    >
      <DateIndicator :selected-date="selectedDate" :compact="compact" />
      <DateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @date-selected="selectDate"
      />
    </div>
    <Weekdays :compact="compact" />
    <ol class="relative grid h-full grid-cols-7">
      <DayItem
        v-for="day in days"
        :compact="compact"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
        :is-current-month="day.isCurrentMonth"
        :model-value="modelValue"
        :has-event="hasEvent(day.date)"
        @click="$emit('date-pick')"
        @update:modelValue="newDate => $emit('update:modelValue', newDate)"
      />
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DateSelector from './components/DateSelector.vue'
import DateIndicator from './components/DateIndicator.vue'
import Weekdays from './components/Weekdays.vue'
import DayItem from './components/DayItem.vue'
import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Exam } from '@/types'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export default defineComponent({
  name: 'Calendar',
  components: { DateSelector, DateIndicator, Weekdays, DayItem },
  props: {
    modelValue: {
      type: String,
      default: ''
    },

    compact: {
      type: Boolean,
      default: false
    },

    events: {
      type: Array as PropType<Exam[]>,
      default: () => {
        return []
      }
    }
  },
  emits: ['update:modelValue', 'date-pick'],
  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format('YYYY-MM-DD')
    }
  },
  computed: {
    days(): { date: string; isCurrentMonth: boolean }[] {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays
      ]
    },
    month(): number {
      return Number(this.selectedDate.format('M'))
    },
    year(): number {
      return Number(this.selectedDate.format('YYYY'))
    },
    numberOfDaysInMonth(): number {
      return dayjs(this.selectedDate).daysInMonth()
    },
    currentMonthDays(): { date: string; isCurrentMonth: boolean }[] {
      return [...Array(this.numberOfDaysInMonth)].map((day, i) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${i + 1}`).format(
            'YYYY-MM-DD'
          ),
          isCurrentMonth: true
        }
      })
    },
    previousMonthDays(): { date: string; isCurrentMonth: boolean }[] {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays?.[0].date
      )
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        'month'
      )

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays?.[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date()

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, i) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + i
            }`
          ).format('YYYY-MM-DD'),
          isCurrentMonth: false
        }
      })
    },
    nextMonthDays(): { date: string; isCurrentMonth: boolean }[] {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      )
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, 'month')
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format('YYYY-MM-DD'),
          isCurrentMonth: false
        }
      })
    }
  },
  methods: {
    hasEvent(date: string): boolean {
      return this.events.some(event => {
        return [event.startDate, event.endDate]
          .map(date => dayjs(date).format('YYYY-MM-DD'))
          .includes(date)
      })
    },
    selectDate(newSelectedDate: Dayjs) {
      this.selectedDate = newSelectedDate
    },
    getWeekday(date: string) {
      return dayjs(date).weekday()
    }
  }
})
</script>
