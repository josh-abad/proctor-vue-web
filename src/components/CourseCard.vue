<template>
  <div
    class="transition duration-500 ease-in-out transform hover:shadow-lg active:scale-95 overflow-hidden bg-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg shadow-md w-45 h-25"
  >
    <router-link :to="`/courses/${course.id}`">
      <img
        src="../assets/course-card-bg.jpg"
        alt="Course image"
        class="w-full h-20 object-cover"
      />
    </router-link>
    <div class="px-4 py-3">
      <BaseLabel emphasis>2023 Online Class</BaseLabel>
      <router-link :to="`/courses/${course.id}`">
        <h1 class="text-lg truncate">{{ course.name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from '@/components/BaseLabel.vue'

export default defineComponent({
  components: { BaseLabel },
  name: 'CourseCard',
  props: {
    course: {
      type: Object as () => Course,
      required: true
    }
  }
})
</script>
