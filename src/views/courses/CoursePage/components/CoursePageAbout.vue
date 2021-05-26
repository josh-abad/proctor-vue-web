<template>
  <AppPanel class="px-4 py-5">
    <AppLabel emphasis>About course</AppLabel>
    <div class="text-sm">
      {{ description }}
    </div>
    <div class="mt-4">
      <div class="flex items-center text-2xl font-semibold">
        {{ studentCount }}
        <UserGroupIcon class="w-6 h-6 ml-2" />
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
import { UserGroupIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'CoursePageAbout',
  components: { AppLabel, AppPanel, UserGroupIcon },
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
