<template>
  <AppPanel class="px-3 py-4">
    <AppLabel emphasis>Course Progress</AppLabel>
    <ProgressBar class="mt-2" :percentage="percentage" />
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

export default defineComponent({
  name: 'CoursePageProgress',
  components: { AppPanel, AppLabel, ProgressBar },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    percentage (): number {
      if (!this.$store.state.user) {
        return 0
      }
      return this.$store.getters.courseCompletedPercentage(this.courseId, this.$store.state.user.id)
    }
  }
})
</script>
