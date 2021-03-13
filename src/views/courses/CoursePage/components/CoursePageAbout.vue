<template>
  <AppPanel class="px-4 py-5">
    <AppLabel emphasis>About course</AppLabel>
    <div class="text-sm">
      {{ description }}
    </div>
    <div class="mt-4">
      <div class="flex items-center text-2xl font-semibold">
        {{ studentCount }}
        <!-- Heroicon name: user-group -->
        <svg class="w-6 h-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          />
        </svg>
      </div>
      <div class="text-sm text-gray-400">
        {{ studentCount === 1 ? "Student" : "Students" }}
        Enrolled
      </div>
    </div>
    <div class="flex items-center mt-4">
      <img
        :src="coordinatorAvatarUrl"
        alt="Avatar"
        class="object-cover w-10 h-10 rounded-full"
      />
      <div class="ml-2">
        <div>
          {{ coordinatorName }}
        </div>
        <div class="text-sm text-gray-400">Course Coordinator</div>
      </div>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'

export default defineComponent({
  name: 'CoursePageAbout',
  components: { AppLabel, AppPanel },
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
