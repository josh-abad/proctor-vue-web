<template>
  <li class="flex py-3 last:pb-0">
    <div class="overflow-hidden w-16 h-16 rounded sm:w-40 sm:h-20">
      <router-link :to="`/courses/${course.slug}`">
        <img
          :src="thumbnail"
          alt="Course image"
          class="object-cover h-full sm:w-full"
        />
      </router-link>
    </div>
    <div class="ml-3 sm:flex sm:justify-between sm:w-full">
      <div>
        <router-link :to="`/courses/${course.slug}`" class="font-semibold">
          {{ course.name }}
        </router-link>
      </div>
      <div class="flex items-center mt-2 w-52 sm:mt-0">
        <ProgressBar class="w-full" :percentage="percentage" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent, PropType } from 'vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import thumbnail from '@/assets/course-thumb.webp'

export default defineComponent({
  name: 'CourseListItem',
  components: { ProgressBar },
  props: {
    course: {
      type: Object as PropType<Course>,
      required: true
    },

    percentage: {
      type: Number,
      default: 0
    }
  },
  computed: {
    thumbnail(): string {
      return thumbnail
    }
  }
})
</script>
