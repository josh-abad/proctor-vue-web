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
          v-for="exams in examsByWeek"
          :key="exams[0].week"
          :course-id="courseId"
          :week="exams[0].week"
          :exams="exams"
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
import { ExamWithTaken } from '@/types'
import { computed, defineComponent, ref } from 'vue'
import Week from './components/Week/Week.vue'
import userService from '@/services/user'

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
  setup(props) {
    const [course, fetchCourse, loading, error] = useFetch(() =>
      coursesService.getCourse(props.courseId)
    )

    fetchCourse()

    const examsTaken = ref<{ exam: string; isTaken: boolean }[]>([])

    userService.getExamsTaken(props.courseId).then(fetchedExamsTaken => {
      examsTaken.value = fetchedExamsTaken
    })

    const examsWithTaken = computed(() => {
      if (!course.value) {
        return []
      }
      return course.value.exams.map(exam => ({
        ...exam,
        isTaken:
          examsTaken.value.find(taken => exam.id === taken.exam)?.isTaken ??
          false
      }))
    })

    const examsByWeek = computed(() => {
      const map = new Map(
        Array.from(examsWithTaken.value, exam => [
          exam.week,
          [] as ExamWithTaken[]
        ])
      )
      examsWithTaken.value.forEach(exam => map.get(exam.week)?.push(exam))
      return Array.from(map.values())
    })

    return {
      course,
      loading,
      error,
      examsByWeek,
      examsTaken
    }
  }
})
</script>
