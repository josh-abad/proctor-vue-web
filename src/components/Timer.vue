<template>
  <div>
    {{ displayHours === '00' ? '' : `${displayHours}:` }}{{ displayMinutes }}:{{ displaySeconds }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Timer',
  props: {
    end: {
      type: [Date, String],
      required: true
    }
  },
  data () {
    return {
      displaySeconds: '0',
      displayMinutes: '0',
      displayHours: '0'
    }
  },
  emits: ['timer-ended'],
  methods: {
    format (n: number): string {
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
  },
  mounted () {
    this.countdown()
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
  }
})
</script>
