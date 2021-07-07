<template>
  <div id="grades-panel" role="tabpanel" aria-labelledby="grades-tab">
    <div v-if="error">
      <ErrorLoading />
    </div>
    <div v-else-if="loading" class="flex justify-center items-center h-32">
      <LoadingWheel class="w-8 h-8" />
    </div>
    <div v-else-if="courseGrades">
      <Grades :grades="courseGrades" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import userService from '@/services/user'
import { CourseGrades } from '@/types'
import LoadingWheel from '../../../../components/LoadingWheel.vue'
import ErrorLoading from '../../../../components/ui/ErrorLoading.vue'
import Grades from '@/components/Grades.vue'

export default defineComponent({
  name: 'CourseGrades',
  components: { LoadingWheel, ErrorLoading, Grades },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [courseGrades, fetchCourseGrades, loading, error] =
      useFetch<CourseGrades | null>(() =>
        userService.getGradesForCourse(props.slug)
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
