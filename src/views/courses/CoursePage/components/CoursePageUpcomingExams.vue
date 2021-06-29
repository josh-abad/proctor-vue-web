<template>
  <AppPanel class="px-3 py-3" v-if="isLoading || upcomingExams.length > 0">
    <FadeTransition>
      <div v-if="isLoading">
        <AppSkeleton class="w-24 h-2" />
        <AppSkeleton class="mt-4 w-24 h-2" />
        <AppSkeleton class="mt-2 w-36 h-2" />
        <AppSkeleton class="mt-2 w-24 h-2" />
        <AppSkeleton class="mt-2 w-36 h-2" />
      </div>
      <div v-else>
        <AppLabel emphasis>Upcoming Exams</AppLabel>
        <div>
          <div
            v-for="event in upcomingExams"
            :key="event.id"
            class="
              flex
              items-center
              py-1
              text-sm text-gray-700
              last:pb-0
              dark:text-gray-300
            "
          >
            <DocumentTextIcon class="w-4 h-4" />
            <div>
              <span class="ml-1 font-semibold text-gray-900 dark:text-white">
                {{ event.label }}
              </span>
              opens
              {{ relativeDate(event) }}
            </div>
          </div>
        </div>
      </div>
    </FadeTransition>
  </AppPanel>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { computed, defineComponent, watch } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import coursesService from '@/services/courses'
import { DocumentTextIcon } from '@heroicons/vue/solid'
import useCourse from '@/composables/use-course'
import useFetch from '@/composables/use-fetch'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'CoursePageUpcomingEvents',
  components: {
    AppPanel,
    AppLabel,
    DocumentTextIcon,
    FadeTransition,
    AppSkeleton
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { course, isLoading: isLoadingCourse } = useCourse(props.slug)

    const [upcomingExams, fetchUpcomingExams, isLoading] = useFetch(() =>
      coursesService.getUpcomingExams(course.value?.id ?? '')
    )

    const relativeDate = (event: Exam) => {
      return event.startDate ? dayjs(event.startDate).fromNow() : 'soon'
    }

    watch(
      course,
      hasLoaded => {
        if (hasLoaded) {
          fetchUpcomingExams()
        }
      },
      { immediate: true }
    )

    return {
      upcomingExams,
      isLoading: computed(() => isLoading.value || isLoadingCourse.value),
      relativeDate
    }
  }
})
</script>
