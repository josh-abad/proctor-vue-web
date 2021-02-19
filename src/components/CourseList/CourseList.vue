<template>
  <div class="course-list">
    <div class="course-list__header label-border">
      <BaseLabel emphasis>Your Courses</BaseLabel>
      <ViewOptions class="mb-2" v-model="viewMode" />
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="!courses.length" class="course-list--empty">
        You don't have any courses.
      </div>
      <div v-else-if="viewMode === 'card'" class="course-list--card-view">
        <CoursesPageCard
          :course="course"
          :key="course.id"
          v-for="course in courses"
        />
      </div>
      <div v-else class="separator-y">
        <CoursesPageListItem
          :course="course"
          :key="course.id"
          v-for="course in courses"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Course } from '@/types'
import BaseLabel from '../BaseLabel.vue'
import CoursesPageCard from '../CoursesPageCard.vue'
import CoursesPageListItem from '@/views/courses/CoursesPage/components/CoursesPageListItem.vue'
import ViewOptions from './components/ViewOptions.vue'

export default defineComponent({
  name: 'CourseList',
  components: {
    BaseLabel,
    CoursesPageCard,
    CoursesPageListItem,
    ViewOptions
  },
  props: {
    courses: {
      type: Array as () => Course[],
      required: true
    }
  },
  data () {
    return {
      viewMode: 'list' as 'card' | 'list'
    }
  },
  watch: {
    viewMode (mode: 'card' | 'list') {
      localStorage.setItem('coursesPageViewState', JSON.stringify(mode))
    }
  },
  created () {
    const coursesPageViewState = localStorage.getItem('coursesPageViewState')
    if (coursesPageViewState) {
      this.viewMode = JSON.parse(coursesPageViewState)
    }
  }
})
</script>

<style lang="postcss" scoped>
.course-list__header {
  @apply flex items-center justify-between -mb-3;
}

.course-list--empty {
  @apply flex items-center justify-center h-40 my-3 text-xl font-semibold text-gray-500;
}

.course-list--card-view {
  @apply mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2;
}

.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 duration-200 ease-in-out transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
