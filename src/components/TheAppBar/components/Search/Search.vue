<template>
  <div class="relative w-full">
    <div class="flex">
      <AppInput
        type="text"
        placeholder="Search courses"
        v-model="searchFilter"
        @focus="open = true"
        v-click-outside="{
          handler: handleClose,
          middleware: clickOutsideMiddleware,
        }"
        class="w-80 shadow-none text-gray-900 dark:text-white bg-gray-900 dark:bg-white bg-opacity-10 dark:bg-opacity-5 border-0"
      />
      <button
        type="submit"
        class="absolute right-0 top-0 mt-3 mr-3 focus:outline-none"
        @click="searchFilter = ''"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="fill-current text-gray-400 dark:text-gray-600 w-5 h-5"
        >
          <path
            v-if="searchFilter"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <transition name="dropdown-fade">
      <div
        class="absolute mt-2 w-full rounded-lg bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 backdrop-blur shadow-lg border border-gray-800 dark:border-gray-100 border-opacity-10 dark:border-opacity-10"
        v-show="open && filteredCourses.length"
      >
        <ul class="max-h-56 rounded-lg py-1 overflow-auto sm:text-sm">
          <Result
            @result-click="$router.push(`/courses/${option.id}`)"
            v-for="(option, i) in filteredCourses"
            :key="i"
          >
            {{ option.name }}
          </Result>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import Result from './components/Result.vue'

export default defineComponent({
  name: 'Search',
  components: { AppInput, Result },
  data () {
    return {
      open: false,
      searchFilter: ''
    }
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    },
    filteredCourses (): Course[] {
      return this.searchFilter ? this.courses.filter(course => course.name.toLowerCase().includes(this.searchFilter.toLowerCase())) : []
    }
  },
  methods: {
    handleClose (): void {
      this.open = false
    },
    clickOutsideMiddleware (e: Event): boolean {
      return (e.target as Element).id !== 'results'
    }
  }
})
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  @apply w-1;
}
</style>
