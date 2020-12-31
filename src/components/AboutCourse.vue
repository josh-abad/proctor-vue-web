<template>
  <BasePanel vibrancy>
    <BaseLabel emphasis>About course</BaseLabel>
    <div class="text-sm">
      {{ description }}
    </div>
    <div class="mt-4">
      <div>{{ studentCount }}</div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        {{ studentCount === 1 ? "Student" : "Students" }}
        Enrolled
      </div>
    </div>
    <BaseLabel class="mt-4" emphasis> Course Coordinator </BaseLabel>
    <div>
      {{ coordinatorName }}
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'
import BasePanel from './BasePanel.vue'

export default defineComponent({
  name: 'AboutCourse',
  components: { BaseLabel, BasePanel },
  props: {
    studentCount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    coordinatorName: {
      type: String,
      required: true
    }
  }
})
</script>
