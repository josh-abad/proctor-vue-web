<script lang="ts">
import { defineComponent } from 'vue'
import { WebcamTimer } from '@/types'

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
  data () {
    const timer = new WebcamTimer(() => {
      this.$emit('leave-timeout')
      timer.start()
    }, 5000)

    return {
      timer
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
      this.timer.start()
    },
    handleFocus (): void {
      this.timer.stop()
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
