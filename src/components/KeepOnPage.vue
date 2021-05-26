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
    const timer = useTimer(() => {
      emit('leave-attempt')
      timer.start()
    }, 5000)

    return {
      timer
    }
  },
  beforeRouteLeave (to, from, next) {
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
    handleBeforeUnload (e: BeforeUnloadEvent) {
      e.preventDefault()
      e.returnValue = ''
    },
    handleUnload () {
      this.$emit('unload')
    },
    handleBlur () {
      this.$emit('leave-focus')
      this.timer.start()
    },
    handleFocus () {
      this.timer.stop()
    },
    clearListeners () {
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
      window.removeEventListener('unload', this.handleUnload)
      window.removeEventListener('blur', this.handleBlur)
      window.removeEventListener('focus', this.handleFocus)
    }
  }
})
</script>
