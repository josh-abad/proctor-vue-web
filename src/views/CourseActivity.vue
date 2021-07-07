<template>
  <div id="activity-panel" role="tabpanel" aria-labelledby="activity-tab">
    <div class="pb-6 border-b border-gray-300 dark:border-gray-700">
      <div class="justify-between hidden text-sm sm:flex" role="radiogroup">
        <RadioButton v-model="statusFilter" value="all">All</RadioButton>
        <RadioButton v-model="statusFilter" value="pending"
          >Pending</RadioButton
        >
        <RadioButton v-model="statusFilter" value="complete"
          >Complete</RadioButton
        >
        <RadioButton v-model="statusFilter" value="in-progress"
          >In-Progress</RadioButton
        >
        <RadioButton v-model="statusFilter" value="expired"
          >Expired</RadioButton
        >
        <RadioButton v-model="statusFilter" value="stopped"
          >Stopped</RadioButton
        >
      </div>
      <AppInput
        placeholder="Search student or exam"
        class="w-full text-sm sm:mt-4"
        v-model="searchFilter"
        type="text"
      />
    </div>
    <FadeTransition>
      <List v-if="isLoading">
        <SkeletonCourseActivityItem v-for="i in 10" :key="i" />
      </List>
      <List v-else-if="attempts.length > 0">
        <CourseActivityItem
          v-model="originalAttempts"
          :attempt="attempt"
          v-for="attempt in attempts"
          :key="attempt.id"
        />
      </List>
      <EmptyState v-else>
        <template #icon>
          <ClipboardListIcon />
        </template>
        <template #content> No activities found. </template>
      </EmptyState>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import useCourse from '@/composables/use-course'
import { computed, defineComponent, ref, watch } from 'vue'
import coursesService from '@/services/courses'
import useFetch from '@/composables/use-fetch'
import RadioButton from '@/components/ui/RadioButton.vue'
import List from '@/components/List.vue'
import CourseActivityItem from '@/components/CourseActivityItem.vue'
import dayjs from 'dayjs'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import AppInput from '@/components/ui/AppInput.vue'
import EmptyState from '@/components/EmptyState.vue'
import { ClipboardListIcon } from '@heroicons/vue/outline'
import SkeletonCourseActivityItem from '@/components/SkeletonCourseActivityItem.vue'

export default defineComponent({
  name: 'CourseActivity',
  components: {
    RadioButton,
    List,
    CourseActivityItem,
    FadeTransition,
    AppInput,
    EmptyState,
    ClipboardListIcon,
    SkeletonCourseActivityItem
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { course, isLoading: isLoadingCourse } = useCourse(props.slug)
    const [attempts, fetchAttempts, isLoading, hasError] = useFetch(
      () => coursesService.getAttemptsInCourse(course.value?.id ?? ''),
      []
    )
    watch(
      course,
      loadedCourse => {
        if (loadedCourse) {
          fetchAttempts()
        }
      },
      { immediate: true }
    )

    const statusFilter =
      ref<
        'all' | 'pending' | 'complete' | 'in-progress' | 'expired' | 'stopped'
      >('all')

    const statusFilteredAttempts = computed(() => {
      switch (statusFilter.value) {
        case 'pending':
          return attempts.value.filter(attempt => attempt.pendingGrade)
        case 'complete':
          return attempts.value.filter(
            attempt =>
              attempt.status === 'completed' &&
              attempt.warnings < 5 &&
              !attempt.pendingGrade
          )
        case 'in-progress':
          return attempts.value.filter(
            attempt => attempt.status === 'in-progress'
          )
        case 'expired':
          return attempts.value.filter(attempt => attempt.status === 'expired')
        case 'stopped':
          return attempts.value.filter(
            attempt => attempt.warnings >= 5 && !attempt.pendingGrade
          )
        default:
          return attempts.value
      }
    })

    const searchFilter = ref('')

    const searchFilteredAttempts = computed(() => {
      if (!searchFilter.value) {
        return statusFilteredAttempts.value
      }
      return statusFilteredAttempts.value.filter(attempt => {
        return [attempt.user.fullName, attempt.exam.label]
          .map(target => target.toLowerCase())
          .some(target => target.includes(searchFilter.value.toLowerCase()))
      })
    })

    const sortedFilteredAttempts = computed(() => {
      return [...searchFilteredAttempts.value].sort((a, b) => {
        return dayjs(b.endDate).diff(dayjs(a.endDate))
      })
    })

    return {
      attempts: sortedFilteredAttempts,
      originalAttempts: attempts,
      isLoading: computed(() => isLoading.value || isLoadingCourse.value),
      hasError,
      statusFilter,
      searchFilter
    }
  }
})
</script>
