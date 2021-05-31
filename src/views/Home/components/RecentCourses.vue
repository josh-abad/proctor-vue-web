<template>
  <div>
    <div class="flex items-center justify-between label-border">
      <AppLabel emphasis>Recent Courses</AppLabel>
    </div>
    <div class="mt-4">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import useFetch from '@/composables/use-fetch'
import users from '@/services/users'
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import SkeletonCourseCard from '@/components/SkeletonCourseCard.vue'
import { useStore } from '@/store'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'

export default defineComponent({
  name: 'RecentCourses',
  components: {
    AppLabel,
    CoursesPageCard,
    SkeletonCourseCard,
    ErrorLoading
  },
  setup() {
    const store = useStore()

    const [recentCourses, fetchRecentCourses, loading, error] = useFetch(
      () => users.getRecentCourses(store.state.user?.id ?? '', 2),
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
