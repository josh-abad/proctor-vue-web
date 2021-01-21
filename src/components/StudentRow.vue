<template>
  <div class="flex items-center px-2 py-4 bg-dark-06 rounded-lg shadow-lg">
    <img
      :src="student.avatarUrl"
      alt="Avatar"
      class="ml-2 w-10 h-10 object-cover rounded-full"
    />
    <div class="ml-4">
      <router-link :to="`/user/${student.id}`">{{
        student.fullName
      }}</router-link>
      <div class="text-sm text-gray-400" v-if="showCourseCount">
        Enrolled in {{ student.courses.length }}
        {{ student.courses.length === 1 ? "course" : "courses" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentRow',
  props: {
    student: {
      type: Object as () => User,
      required: true
    },
    showCourseCount: {
      type: Boolean,
      default: false
    }
  }
})
</script>
