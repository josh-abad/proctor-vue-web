<template>
  <div :class="compact ? 'font-semibold' : 'font-bold text-2xl'">
    {{ selectedMonth }}
  </div>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs'
import { defineComponent, PropType } from 'vue'
import compactMixin from '@/mixins/compact'

export default defineComponent({
  name: 'DateIndicator',
  mixins: [compactMixin],
  props: {
    selectedDate: {
      type: Object as PropType<Dayjs>,
      required: true
    }
  },
  computed: {
    selectedMonth (): string {
      return this.selectedDate.format('MMMM YYYY')
    }
  }
})
</script>
