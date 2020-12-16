<template>
  <div>
    {{ displayHours }}:{{ displayMinutes }}:{{ displaySeconds }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Timer',
  data () {
    return {
      displaySeconds: '0',
      displayMinutes: '0',
      displayHours: '0'
    }
  },
  methods: {
    format (n: number): string {
      return n < 10 ? `0${n}` : `${n}`
    },
    countdown () {
      const timer = setInterval(() => {
        const now = new Date()
        const end = new Date()
        end.setHours(end.getHours() + 2)
        const distance = end.getTime() - now.getTime()

        if (distance < 0) {
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
