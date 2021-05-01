<template>
  <div>
    <div class="flex items-center justify-between label-border">
      <AppLabel emphasis>Recent Courses</AppLabel>
    </div>
    <div>
      <div v-if="error">Error! Could not load recent courses.</div>
      <div v-else-if="loading" class="flex justify-start w-full mt-4 space-x-4">
        <SkeletonCourseCard />
        <SkeletonCourseCard class="hidden sm:block" />
      </div>
      <div v-else class="flex mt-4 space-x-4 overflow-x-auto wrapper">
        <CoursesPageCard
          class="flex-none carousel-1 sm:carousel-2 snap"
          :class="i % 2 === 0 ? 'sm:snap' : 'sm:snap-none'"
          :course="course"
          :key="course.id"
          v-for="(course, i) in recentCourses"
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

export default defineComponent({
  name: 'RecentCourses',
  components: {
    AppLabel,
    CoursesPageCard,
    SkeletonCourseCard
  },
  setup () {
    const store = useStore()

    const [
      recentCourses,
      fetchRecentCourses,
      loading,
      error
    ] = useFetch(() => users.getRecentCourses(store.state.user?.id ?? ''), [])

    fetchRecentCourses().then(() => {
      recentCourses.value.reverse()
    })

    return {
      recentCourses,
      loading,
      error
    }
  }
})
</script>

<style lang="postcss" scoped>
.wrapper {
  scroll-snap-type: x mandatory;
}

::-webkit-scrollbar {
  display: none;
}
</style>
