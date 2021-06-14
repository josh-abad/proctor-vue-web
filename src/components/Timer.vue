<template>
  <div class="flex items-center text-xl font-medium">
    <ClockIcon class="w-6 h-6" />
    <div class="ml-1.5">
      {{ displayHours }}
    </div>
    :
    <div>
      {{ displayMinutes }}
    </div>
    :
    <div>
      {{ displaySeconds }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ClockIcon } from '@heroicons/vue/solid'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Timer',
  components: { ClockIcon },
  props: {
    end: {
      type: [Object, String, Number] as PropType<Date | string | number>,
      required: true
    }
  },
  emits: ['timer-ended'],
  data() {
    return {
      displaySeconds: '0',
      displayMinutes: '0',
      displayHours: '0'
    }
  },
  computed: {
    seconds: (): number => 1000,
    minutes(): number {
      return this.seconds * 60
    },
    hours(): number {
      return this.minutes * 60
    },
    days(): number {
      return this.hours * 24
    }
  },
  mounted() {
    this.countdown()
  },
  methods: {
    format(n: number) {
      return n.toString().padStart(2, '0')
    },
    countdown() {
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
