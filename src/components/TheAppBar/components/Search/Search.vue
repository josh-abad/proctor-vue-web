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
        class="text-gray-900 bg-gray-900 border-0 shadow-none w-80 dark:text-white dark:bg-white bg-opacity-10 dark:bg-opacity-5"
      />
      <button
        type="submit"
        class="absolute top-0 right-0 mt-3 mr-3 focus:outline-none"
        @click="searchFilter = ''"
      >
        <XIcon
          class="w-5 h-5 text-gray-400 fill-current dark:text-gray-600"
          v-if="searchFilter"
        />
        <SearchIcon
          class="w-5 h-5 text-gray-400 fill-current dark:text-gray-600"
          v-else
        />
      </button>
    </div>
    <transition name="dropdown-fade">
      <div
        class="absolute w-full mt-2 bg-white bg-opacity-50 border border-gray-800 rounded-lg shadow-lg dark:bg-gray-900 dark:bg-opacity-75 backdrop-filter backdrop-blur dark:border-gray-100 border-opacity-10 dark:border-opacity-10"
        v-show="open && filteredCourses.length"
      >
        <ul class="py-1 overflow-auto rounded-lg max-h-56 sm:text-sm">
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
import { SearchIcon, XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Search',
  components: { AppInput, Result, SearchIcon, XIcon },
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
