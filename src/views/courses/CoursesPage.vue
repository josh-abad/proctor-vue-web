<template>
  <div>
    <ColorHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]"
      @menu-clicked="isOpen = !isOpen"
      :hide-menu="!$store.getters.permissions('admin')"
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
        <div class="flex items-center" v-if="courses.length">
          <ViewToggle v-model="viewMode" value="card" class="mr-3">
            <!-- Heroicon name: view-grid -->
              <svg
                class="fill-current w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm6-6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
          </ViewToggle>
          <ViewToggle v-model="viewMode" value="list">
            <!-- Heroicon name: view-list -->
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
          </ViewToggle>
          </div>
        </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="loaded && !courses.length"
          class="mt-3 flex justify-center items-center h-40"
        >
          <div class="font-semibold text-xl text-gray-500">
            You don't have any courses.
          </div>
        </div>
        <div v-else-if="viewMode === 'card'" class="mt-3">
          <div class="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <CoursesPageCard
              :course="course"
              :key="course.id"
              v-for="course in courses"
            />
          </div>
        </div>
        <div v-else>
          <div>
            <div
              v-if="loaded"
              class="divide-y divide-gray-300 dark:divide-gray-700"
            >
              <CoursesPageListItem
                :course="course"
                :key="course.id"
                v-for="course in courses"
              />
            </div>
            <div v-else class="divide-y divide-gray-300 dark:divide-gray-700">
              <SkeletonCourseListItem v-for="i in 10" :key="i" />
            </div>
          </div>
        </div>
      </transition>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BasePanel from '@/components/BasePanel.vue'
import ColorHeader from '@/components/ColorHeader.vue'
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import CoursesPageListItem from '@/components/CoursesPageListItem.vue'
import SkeletonCourseListItem from '@/components/SkeletonCourseListItem.vue'
import ViewToggle from '@/components/ViewToggle.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CoursesPage',
  components: { CoursesPageCard, BasePanel, ColorHeader, CoursesPageListItem, SkeletonCourseListItem, ViewToggle },
  data () {
    return {
      isOpen: false,
      viewMode: 'list' as 'card' | 'list',
      loaded: false
    }
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
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
    setTimeout(() => {
      this.loaded = true
    }, 500)
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
