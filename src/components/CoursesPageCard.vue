<template>
  <div
    class="
      overflow-hidden
      bg-white
      rounded-lg
      shadow
      duration-500
      ease-in-out
      dark:bg-gray-700
      hover:bg-white
      hover:shadow-lg
      dark:hover:bg-gray-600
    "
  >
    <router-link :to="`/courses/${course.slug}`">
      <img
        src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
        alt="Course image"
        class="object-cover w-full h-14"
      />
    </router-link>
    <div class="py-3 px-4">
      <router-link :to="`/courses/${course.slug}`">
        <h1 class="text-lg font-semibold truncate">{{ course.name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CourseCard',
  props: {
    course: {
      type: Object as PropType<Course>,
      required: true
    }
  }
})
</script>
