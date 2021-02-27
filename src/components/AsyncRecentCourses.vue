<template>
  <!-- <div class="mt-4 flex justify-start space-x-4 ease-in-out duration-300"> -->
  <div class="course-list--card-view">
    <CoursesPageCard
      :course="course"
      :key="course.id"
      v-for="course in recentCourses.slice(start, end)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CoursesPageCard from './CoursesPageCard.vue'
import usersService from '@/services/users'

export default defineComponent({
  name: 'AsyncRecentCourses',
  components: { CoursesPageCard },
  props: {
    start: {
      type: Number,
      required: true
    },

    end: {
      type: Number,
      required: true
    },

    userId: {
      type: String,
      required: true
    }
  },
  async setup (props) {
    const recentCourses = ref(await usersService.getRecentCourses(props.userId))
    recentCourses.value.reverse()

    return {
      recentCourses
    }
  }
})
</script>

<style lang="postcss" scoped>
.course-list--card-view {
  @apply mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2;
}
</style>
