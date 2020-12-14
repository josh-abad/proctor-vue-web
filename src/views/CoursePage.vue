<template>
  <div v-if="course" class="py-4">
    <div class="dark:bg-gray-800 py-3 px-4 rounded-xl border dark:border-gray-700">
      <h1 class="text-3xl">{{ course.name }}</h1>
      <p class="pt-2 dark:text-gray-500">Home > Courses > <span class="dark:text-green-500">Code</span></p>
    </div>
    <div>
      <router-link :to="`/courses/${$route.params.id}/exam`">Go to exam</router-link>
    </div>
  </div>
  <div v-else class="p-40">
    <p class="text-2xl font-mono uppercase tracking-wider dark:text-gray-200">Course not found</p>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoursePage',
  props: {
    courseName: String
  },
  computed: {
    course (): Course {
      const id: string | string[] = this.$route.params.id
      return this.$store.getters.getCourseByID(id)
    }
  }
})
</script>
