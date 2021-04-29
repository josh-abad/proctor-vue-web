<template>
  <div>
    <div v-if="error">Could not load course.</div>
    <div v-else-if="loading" class="space-y-2">
      <div v-for="i in 10" :key="i">
        <div class="py-2 label-border">
          <AppSkeleton class="h-2 w-28" />
        </div>
        <div class="flex items-center justify-between py-3">
          <div class="flex">
            <AppSkeleton class="w-5 h-3 mr-2" />
            <AppSkeleton class="w-32 h-3" />
          </div>
          <SVGCheckbox :model-value="false" static-check />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col space-y-2" v-if="course?.exams.length">
        <Week
          v-for="week in course.weeks"
          :key="week"
          :course-id="courseId"
          :week="week"
        />
      </div>
      <div class="flex items-center justify-center py-5" v-else>
        <span class="text-gray-500">No exams found.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SVGCheckbox from '@/components/SVGCheckbox.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'
import { defineComponent } from 'vue'
import Week from './components/Week/Week.vue'

export default defineComponent({
  name: 'CourseOverview',
  components: {
    Week,
    AppSkeleton,
    SVGCheckbox
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const [
      course,
      fetchCourse,
      loading,
      error
    ] = useFetch(() => coursesService.getCourse(props.courseId))

    fetchCourse()

    return {
      course,
      loading,
      error
    }
  }
})
</script>
