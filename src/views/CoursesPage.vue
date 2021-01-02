<template>
  <div>
    <BasePanel>
      <div class="flex justify-between items-center">
        <div class="text-xl font-bold">Your Courses</div>
        <svg
          v-if="$store.getters.permissions('admin')"
          @click="isOpen = !isOpen"
          class="w-5 h-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
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
            class="origin-top-right z-10 absolute right-0 mt-20 mr-10 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"
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
      </div>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in alphabeticalCourses">
          <CourseCard :course="course" />
        </div>
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BasePanel from '@/components/BasePanel.vue'
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard, BasePanel },
  name: 'CoursesPage',
  data () {
    return {
      isOpen: false
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
