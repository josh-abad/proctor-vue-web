<template>
  <div
    class="transition duration-500 ease-in-out transform shadow hover:shadow-lg overflow-hidden bg-white dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 rounded-lg w-72"
  >
    <router-link :to="`/courses/${course.id}`">
      <img
        src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
        alt="Course image"
        class="w-full h-14 object-cover"
      />
    </router-link>
    <div class="px-4 py-3">
      <AppLabel emphasis>2023 Online Class</AppLabel>
      <router-link :to="`/courses/${course.id}`">
        <h1 class="text-lg truncate font-semibold">{{ course.name }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'

export default defineComponent({
  name: 'CourseCard',
  components: { AppLabel },
  props: {
    course: {
      type: Object as () => Course,
      required: true
    }
  }
})
</script>
