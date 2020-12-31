<template>
  <div class="mt-4">
    <div class="font-bold text-xl">Students Enrolled in Course</div>
    <div v-if="students">
      <div v-for="student in students" :key="student.id">
        {{ student.name.first }} {{ student.name.last }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'

export default defineComponent({
  name: 'CourseStudents',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    students (): User[] {
      return this.$store.getters.studentsByCourse(this.courseId)
    }
  }
})
</script>
