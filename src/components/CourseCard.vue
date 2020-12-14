<template>
  <div class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl dark:bg-gray-700 rounded-lg shadow-md truncate w-45 h-25">
    <router-link :to="`/courses/${courseId}`">
      <img src="../assets/course_card_bg.jpg" alt="Course image" class="object-cover" />
    </router-link>
    <div class="px-4 py-3">
      <h3 class="uppercase text-xs font-semibold tracking-wider dark:text-gray-400">2023 Online Class</h3>
      <router-link :to="`/courses/${courseId}`">
        <h1 class="text-lg">{{ name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCard',
  props: {
    courseId: String,
    name: String
  }
})
</script>
