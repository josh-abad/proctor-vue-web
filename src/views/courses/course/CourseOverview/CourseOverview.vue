<template>
  <transition name="fade" mode="out-in">
    <div v-if="error">Could not load course.</div>
    <div v-else-if="loading" class="space-y-2">
      <div v-for="i in 8" :key="i">
        <Subheading class="pb-3">
          <AppSkeleton class="h-2 w-28" />
        </Subheading>
        <div class="flex items-center justify-between py-3">
          <AppSkeleton class="w-32 h-3" />
          <SVGCheckbox :model-value="false" static-check />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col space-y-2" v-if="course?.exams.length">
        <Week
          v-for="exams in examsByWeek"
          :key="exams[0].week"
          :course-slug="slug"
          :week="exams[0].week"
          :exams="exams"
        />
      </div>
      <EmptyState v-else>
        <template #icon><DocumentTextIcon /></template>
        <template #content>No exams found.</template>
      </EmptyState>
    </div>
  </transition>
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
import Subheading from '@/components/Subheading.vue'
import EmptyState from '@/components/EmptyState.vue'
import { DocumentTextIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'CourseOverview',
  components: {
    Week,
    AppSkeleton,
    SVGCheckbox,
    Subheading,
    EmptyState,
    DocumentTextIcon
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const [course, fetchCourse, loading, error] = useFetch(() =>
      coursesService.getCourse(props.slug)
    )

    fetchCourse().then(() => {
      userService.getExamsTaken(course.value.id).then(fetchedExamsTaken => {
        examsTaken.value = fetchedExamsTaken
      })
    })

    const examsTaken = ref<{ exam: string; isTaken: boolean }[]>([])

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
