<template>
  <BasePanel>
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
    <div class="mt-4 flex items-center">
      <img
        :src="coordinatorAvatarUrl"
        alt="Avatar"
        class="w-10 h-10 object-cover rounded-full"
      />
      <div class="ml-2">
        <div>
          {{ coordinatorName }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Course Coordinator
        </div>
      </div>
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
    },

    coordinatorAvatarUrl: {
      type: String,
      required: true
    }
  }
})
</script>
