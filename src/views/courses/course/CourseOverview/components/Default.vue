<template>
  <div class="flex flex-col space-y-2" v-if="course.exams.length">
    <Week
      v-for="week in course.weeks"
      :key="week"
      :courseId="courseId"
      :week="week"
    />
  </div>
  <div class="flex items-center justify-center py-5" v-else>
    <span class="text-gray-500">No exams found.</span>
  </div>
</template>

<script lang="ts">
import coursesService from '@/services/courses'
import { defineComponent, ref } from 'vue'
import Week from './Week/Week.vue'

export default defineComponent({
  name: 'Default',
  components: { Week },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  async setup (props) {
    const course = ref(await coursesService.getCourse(props.courseId))

    return {
      course
    }
  }
})
</script>
