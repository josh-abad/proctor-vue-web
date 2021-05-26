<template>
  <div class="flex items-center h-10 pr-3 overflow-hidden border-r border-gray-300 dark:border-gray-700">
    <div class="text-lg font-semibold">
      <span v-if="displayHours !== '00'"
        >{{ displayHours }}<span class="font-thin">h</span></span
      >
      <span v-if="displayMinutes !== '00'"
        >{{ displayMinutes }}<span class="font-thin">m</span></span
      >
      {{ displaySeconds }}<span class="font-thin">s</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Timer',
  props: {
    end: {
      type: [Object, String] as PropType<Date | string>,
      required: true
    }
  },
  emits: ['timer-ended'],
  data () {
    return {
      displaySeconds: '0',
      displayMinutes: '0',
      displayHours: '0'
    }
  },
  computed: {
    seconds: (): number => 1000,
    minutes (): number {
      return this.seconds * 60
    },
    hours (): number {
      return this.minutes * 60
    },
    days (): number {
      return this.hours * 24
    }
  },
  mounted () {
    this.countdown()
  },
  methods: {
    format (n: number) {
      return n.toString().padStart(2, '0')
    },
    countdown () {
      const timer = setInterval(() => {
        const distance = dayjs(this.end).diff(new Date())

        if (distance < 0) {
          this.$emit('timer-ended')
          clearInterval(timer)
          return
        }

        const hours = Math.floor((distance % this.days) / this.hours)
        const minutes = Math.floor((distance % this.hours) / this.minutes)
        const seconds = Math.floor((distance % this.minutes) / this.seconds)
        this.displayMinutes = this.format(minutes)
        this.displaySeconds = this.format(seconds)
        this.displayHours = this.format(hours)
      }, 1000)
    }
  }
})
</script>
