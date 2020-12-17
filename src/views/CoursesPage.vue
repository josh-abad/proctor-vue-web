<template>
  <div class="dark:bg-gray-800 mx-8 my-5 rounded-xl py-4 px-8 border dark:border-gray-700">
    <h1 class="text-lg font-semibold">Course overview</h1>
    <div class="grid grid-cols-3 gap-7 my-8">
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
