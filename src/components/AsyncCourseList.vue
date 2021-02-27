<template>
  <section v-if="!courses.length" class="course-list--empty">
    You don't have any courses.
  </section>
  <section v-else-if="viewMode === 'card'" class="course-list--card-view">
    <CoursesPageCard
      :course="course"
      :key="course.id"
      v-for="course in courses"
    />
  </section>
  <section v-else-if="viewMode === 'list'" class="separator-y">
    <CoursesPageListItem
      :course="course"
      :key="course.id"
      v-for="course in courses"
    />
  </section>
</template>

<script lang="ts">
import CoursesPageListItem from '@/components/CoursesPageListItem.vue'
import { defineComponent, ref } from 'vue'
import CoursesPageCard from './CoursesPageCard.vue'
import { useStore } from 'vuex'
import { SET_COURSES } from '@/store/mutation-types'
import usersService from '@/services/users'

export default defineComponent({
  name: 'AsyncCourseList',
  components: { CoursesPageListItem, CoursesPageCard },
  props: {
    viewMode: {
      type: String,
      default: 'list'
    },

    userId: {
      type: String,
      required: true
    }
  },
  async setup (props) {
    const store = useStore()

    const courses = ref(await usersService.getCourses(props.userId))

    store.commit(SET_COURSES, courses.value)

    return {
      courses
    }
  }
})
</script>

<style lang="postcss" scoped>
/* .course-list--empty {
  @apply flex items-center justify-center h-40 my-3 text-xl font-semibold text-gray-500;
} */

.course-list--card-view {
  @apply mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2;
}
</style>
