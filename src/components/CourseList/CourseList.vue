<template>
  <div class="course-list">
    <div class="course-list__header label-border">
      <AppLabel emphasis>Your Courses</AppLabel>
      <ViewOptions class="mb-2" v-model="viewMode" />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="error" class="mt-8"><ErrorLoading /></div>
      <div v-else-if="loading">
        <section v-if="viewMode === 'card'" class="course-list--card-view">
          <SkeletonCourseCard :key="i" v-for="i in 10" />
        </section>
        <section v-else-if="viewMode === 'list'" class="separator-y">
          <SkeletonCourseListItem :key="i" v-for="i in 10" />
        </section>
      </div>
      <div v-else>
        <section v-if="!courses.length" class="course-list--empty">
          You don't have any courses.
        </section>
        <section v-else-if="viewMode === 'card'" class="course-list--card-view">
          <CoursesPageCard
            class="w-full"
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
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import ViewOptions from './components/ViewOptions.vue'
import usersService from '@/services/users'
import useLocalStorage from '@/composables/use-local-storage'
import useFetch from '@/composables/use-fetch'
import { useStore } from '@/store'
import CoursesPageCard from '../CoursesPageCard.vue'
import SkeletonCourseListItem from '../SkeletonCourseListItem.vue'
import SkeletonCourseCard from '../SkeletonCourseCard.vue'
import CoursesPageListItem from '../CoursesPageListItem.vue'
import ErrorLoading from '../ui/ErrorLoading.vue'

export default defineComponent({
  name: 'CourseList',
  components: {
    AppLabel,
    ViewOptions,
    CoursesPageCard,
    CoursesPageListItem,
    SkeletonCourseCard,
    SkeletonCourseListItem,
    ErrorLoading
  },
  setup () {
    const store = useStore()

    const viewMode = useLocalStorage<'card' | 'list'>('coursesPageViewState', 'list')

    const [
      courses,
      fetchRecentCourses,
      loading,
      error
    ] = useFetch(() => usersService.getCourses(store.state.user?.id ?? ''), [])

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

<style lang="postcss" scoped>
.course-list__header {
  @apply flex items-center justify-between -mb-3;
}

.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 duration-200 ease-in-out transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

/* .course-list--empty {
  @apply flex items-center justify-center h-40 my-3 text-xl font-semibold text-gray-500;
} */

.course-list--card-view {
  @apply mt-8 grid grid-cols-1 gap-4 md:grid-cols-2;
}
</style>
