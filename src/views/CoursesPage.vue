<template>
  <div class="dark:bg-gray-800 m-8 rounded-xl px-6 pb-6 border dark:border-gray-700">
    <h1 class="text-lg font-semibold mt-5">Course overview</h1>
    <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
      <div :key="course.id" v-for="course in courses">
        <CourseCard :course="course" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard },
  name: 'CoursesPage',
  computed: {
    courses (): Course[] {
      return this.$store.getters.getUserCourses
    }
  }
})
</script>
