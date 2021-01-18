<template>
  <BasePanel class="px-3 py-4">
    <BaseLabel emphasis>Course Progress</BaseLabel>
    <ProgressBar class="mt-2" :percentage="percentage" />
  </BasePanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'
import BasePanel from './BasePanel.vue'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
  name: 'CoursePageProgress',
  components: { BasePanel, BaseLabel, ProgressBar },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    percentage (): number {
      return this.$store.getters.courseCompletedPercentage(this.courseId, this.$store.state.user.id)
    }
  }
})
</script>
