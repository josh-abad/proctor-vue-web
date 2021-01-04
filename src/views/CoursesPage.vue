<template>
  <div>
    <ColorHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]"
      @menu-clicked="isOpen = !isOpen"
      :hideMenu="!$store.getters.permissions('admin')"
      >Courses</ColorHeader
    >
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      v-show="isOpen"
    >
      <div
        class="origin-top-right z-10 absolute right-0 -mt-24 mr-20 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <router-link
            to="/courses/new"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >Create Course</router-link
          >
        </div>
      </div>
    </transition>
    <BasePanel class="mt-4">
      <div
        class="flex justify-between items-center border-b border-gray-300 dark:border-gray-700"
      >
        <div class="text-lg font-bold mb-3">Your Courses</div>
        <div class="flex items-center">
          <div class="mr-3">
            <button
              @click="handleViewChange('card')"
              class="focus:outline-none rounded"
              :class="viewMode === 'card' ? 'text-green-500' : 'text-gray-500'"
              title="Card"
            >
              <svg
                class="fill-current w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button
              @click="handleViewChange('list')"
              class="focus:outline-none rounded"
              :class="viewMode === 'list' ? 'text-green-500' : 'text-gray-500'"
              title="List"
            >
              <svg
                class="fill-current w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="viewMode === 'card'" class="mt-3">
          <div class="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div :key="course.id" v-for="course in alphabeticalCourses">
              <CourseCard :course="course" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="divide-y divide-gray-300 dark:divide-gray-700">
            <div
              :key="course.id"
              v-for="course in alphabeticalCourses"
              class="flex justify-between items-center py-3"
            >
              <div>
                <BaseLabel emphasis>2023T Online Class</BaseLabel>
                <router-link :to="`/courses/${course.id}`">
                  {{ course.name }}
                </router-link>
              </div>
              <div class="w-60">
                <ProgressBar
                  :percentage="
                    $store.getters.courseCompletedPercentage(course.id)
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import ColorHeader from '@/components/ColorHeader.vue'
import CourseCard from '@/components/CourseCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard, BasePanel, BaseLabel, ProgressBar, ColorHeader },
  name: 'CoursesPage',
  data () {
    return {
      isOpen: false,
      viewMode: 'list' as 'card' | 'list'
    }
  },
  created () {
    const coursesPageViewState = localStorage.getItem('coursesPageViewState')
    if (coursesPageViewState) {
      this.viewMode = JSON.parse(coursesPageViewState)
    }
  },
  methods: {
    handleViewChange (viewMode: 'card' | 'list'): void {
      this.viewMode = viewMode
      localStorage.setItem('coursesPageViewState', JSON.stringify(this.viewMode))
    }
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    },
    alphabeticalCourses (): Course[] {
      const alphabetical = (a: Course, b: Course) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        }
        return 0
      }
      return [...this.courses].sort(alphabetical)
    }
  }
})
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 duration-200 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
