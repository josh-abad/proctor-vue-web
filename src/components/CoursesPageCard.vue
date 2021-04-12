<template>
  <div
    class="overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-lg shadow hover:shadow-lg dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600"
  >
    <router-link :to="`/courses/${course.id}`">
      <img
        src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
        alt="Course image"
        class="object-cover w-full h-14"
      />
    </router-link>
    <div class="px-4 py-3">
      <router-link :to="`/courses/${course.id}`">
        <h1 class="text-lg font-semibold truncate">{{ course.name }}</h1>
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
