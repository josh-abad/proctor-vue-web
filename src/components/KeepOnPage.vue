<script lang="ts">
import { defineComponent } from 'vue'
import useTimer from '@/composables/use-timer'

export default defineComponent({
  name: 'KeepOnPage',
  props: {
    preventLeave: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'leave-attempt',
    'leave-focus',
    'leave-timeout',
    'unload'
  ],
  setup (_props, { emit }) {
    const { startTimer, stopTimer } = useTimer(() => {
      emit('leave-attempt')
      startTimer()
    }, 5000)

    return {
      startTimer,
      stopTimer
    }
  },
  beforeRouteLeave (to, from, next): void {
    if (this.preventLeave) {
      this.$emit('leave-attempt')
    } else {
      this.clearListeners()
      next()
    }
  },
  mounted () {
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    window.addEventListener('unload', this.handleUnload)
    window.addEventListener('blur', this.handleBlur)
    window.addEventListener('focus', this.handleFocus)
  },
  unmounted () {
    this.clearListeners()
  },
  methods: {
    handleBeforeUnload (e: BeforeUnloadEvent): void {
      e.preventDefault()
      e.returnValue = ''
    },
    handleUnload (): void {
      this.$emit('unload')
    },
    handleBlur (): void {
      this.$emit('leave-focus')
      this.startTimer()
    },
    handleFocus (): void {
      this.stopTimer()
    },
    clearListeners (): void {
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
      window.removeEventListener('unload', this.handleUnload)
      window.removeEventListener('blur', this.handleBlur)
      window.removeEventListener('focus', this.handleFocus)
    }
  }
})
</script>
