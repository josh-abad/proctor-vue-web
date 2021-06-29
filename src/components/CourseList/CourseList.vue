<template>
  <div class="course-list">
    <Subheading>
      <AppLabel emphasis>Your Courses</AppLabel>
      <ViewOptions v-model="viewMode" />
    </Subheading>
    <FadeTransition>
      <div v-if="error" class="mt-8"><ErrorLoading /></div>
      <div v-else-if="loading">
        <section
          v-if="viewMode === 'card'"
          class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2"
        >
          <SkeletonCourseCard :key="i" v-for="i in 10" />
        </section>
        <List v-else-if="viewMode === 'list'">
          <SkeletonCourseListItem :key="i" v-for="i in 10" />
        </List>
      </div>
      <div
        v-else-if="!courses.length"
        class="flex justify-center py-4 mt-8 text-gray-500"
      >
        You don't have any courses.
      </div>
      <section
        v-else-if="viewMode === 'card'"
        class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2"
      >
        <CoursesPageCard
          class="w-full"
          :course="course"
          :key="course.id"
          v-for="course in courses"
        />
      </section>
      <List v-else-if="viewMode === 'list'">
        <CoursesPageListItem
          :course="course"
          :key="course.id"
          :percentage="course.progress"
          v-for="course in courses"
        />
      </List>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import ViewOptions from './components/ViewOptions.vue'
import userService from '@/services/user'
import useLocalStorage from '@/composables/use-local-storage'
import useFetch from '@/composables/use-fetch'
import CoursesPageCard from '../CoursesPageCard.vue'
import SkeletonCourseListItem from '../SkeletonCourseListItem.vue'
import SkeletonCourseCard from '../SkeletonCourseCard.vue'
import CoursesPageListItem from '../CoursesPageListItem.vue'
import ErrorLoading from '../ui/ErrorLoading.vue'
import List from '../List.vue'
import Subheading from '../Subheading.vue'
import FadeTransition from '../transitions/FadeTransition.vue'

export default defineComponent({
  name: 'CourseList',
  components: {
    AppLabel,
    ViewOptions,
    CoursesPageCard,
    CoursesPageListItem,
    SkeletonCourseCard,
    SkeletonCourseListItem,
    ErrorLoading,
    List,
    Subheading,
    FadeTransition
  },
  setup() {
    const viewMode = useLocalStorage<'card' | 'list'>(
      'coursesPageViewState',
      'list'
    )

    const [courses, fetchRecentCourses, loading, error] = useFetch(
      () => userService.getCourses(),
      []
    )

    fetchRecentCourses()

    return {
      viewMode,
      courses,
      loading,
      error
    }
  }
})
</script>
