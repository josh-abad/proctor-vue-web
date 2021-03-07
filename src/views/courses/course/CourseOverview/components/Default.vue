<template>
  <div class="flex flex-col space-y-2">
    <Week
      v-for="week in course.weeks"
      :key="week"
      :courseId="courseId"
      :week="week"
    />
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
