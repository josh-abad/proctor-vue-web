<template>
  <div v-if="error">
    <ErrorLoading />
  </div>
  <div v-else-if="loading" class="flex items-center justify-center h-32">
    <LoadingWheel class="w-8 h-8" />
  </div>
  <div v-else-if="courseGrades" class="table-bg">
    <Grades :grades="courseGrades" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CourseGrades } from '@/types'
import LoadingWheel from '@/components/LoadingWheel.vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import Grades from '@/components/Grades.vue'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'

export default defineComponent({
  name: 'CourseGrades',
  components: { LoadingWheel, ErrorLoading, Grades },
  props: {
    slug: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [courseGrades, fetchCourseGrades, loading, error] =
      useFetch<CourseGrades | null>(() =>
        coursesService.getUserGrades(props.slug, props.userId)
      )

    fetchCourseGrades()

    return {
      courseGrades,
      loading,
      error
    }
  }
})
</script>
