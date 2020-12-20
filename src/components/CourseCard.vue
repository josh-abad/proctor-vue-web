<template>
  <div class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg dark:bg-gray-700 rounded-lg shadow-md truncate w-45 h-25">
    <router-link :to="`/courses/${course.id}`">
      <img src="../assets/course-card-bg.jpg" alt="Course image" class="object-cover" />
    </router-link>
    <div class="px-4 py-3">
      <h3 class="uppercase text-xs font-semibold tracking-wider dark:text-gray-400">2023 Online Class</h3>
      <router-link :to="`/courses/${course.id}`">
        <h1 class="text-lg">{{ course.name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCard',
  props: {
    course: {
      type: Object as () => Course,
      required: true
    }
  }
})
</script>
