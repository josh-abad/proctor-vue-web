<template>
  <div v-if="loading || recentCourses.length > 0">
    <Subheading>
      <AppLabel emphasis>Recent Courses</AppLabel>
    </Subheading>
    <div class="mt-4">
      <transition name="fade" mode="out-in">
        <div v-if="error">
          <ErrorLoading />
        </div>
        <div v-else-if="loading" class="flex justify-start w-full space-x-4">
          <SkeletonCourseCard />
          <SkeletonCourseCard class="hidden sm:block" />
        </div>
        <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CoursesPageCard
            :course="course"
            :key="course.id"
            v-for="course in recentCourses"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import useFetch from '@/composables/use-fetch'
import userService from '@/services/user'
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import SkeletonCourseCard from '@/components/SkeletonCourseCard.vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import Subheading from '@/components/Subheading.vue'

export default defineComponent({
  name: 'RecentCourses',
  components: {
    AppLabel,
    CoursesPageCard,
    SkeletonCourseCard,
    ErrorLoading,
    Subheading
  },
  setup() {
    const [recentCourses, fetchRecentCourses, loading, error] = useFetch(
      () => userService.getRecentCourses(2),
      []
    )

    fetchRecentCourses()

    return {
      recentCourses,
      loading,
      error
    }
  }
})
</script>
