<template>
  <div class="relative w-full">
    <div class="flex">
      <AppInput
        type="text"
        placeholder="Search courses"
        v-model="searchFilter"
        @focus="open = true"
        v-click-outside="handleClickOutside"
        class="search-bar"
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
      <div class="search-dropdown" v-show="open && filteredCourses.length">
        <ul class="py-1 overflow-auto rounded-lg max-h-56 sm:text-sm">
          <Result
            @result-click="$router.push(`/courses/${option.slug}`)"
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
import { defineComponent, ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import Result from './components/Result.vue'
import { SearchIcon, XIcon } from '@heroicons/vue/solid'
import useClickOutside from '@/composables/use-click-outside'
import userService from '@/services/user'

export default defineComponent({
  name: 'Search',
  components: { AppInput, Result, SearchIcon, XIcon },
  data() {
    return {
      searchFilter: ''
    }
  },
  setup() {
    const open = ref(false)

    const handleClickOutside = useClickOutside(() => {
      open.value = false
    }, 'results')

    const courses = ref<Course[]>([])
    userService.getCourses().then(fetchedCourses => {
      courses.value = fetchedCourses
    })

    return {
      open,
      handleClickOutside,
      courses
    }
  },
  computed: {
    filteredCourses(): Course[] {
      return this.searchFilter
        ? this.courses.filter(course =>
            course.name.toLowerCase().includes(this.searchFilter.toLowerCase())
          )
        : []
    }
  }
})
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  @apply w-1;
}

.search-bar {
  @apply text-gray-900 bg-gray-900 border-0 shadow-none  w-80 dark:text-white dark:bg-white bg-opacity-10 dark:bg-opacity-5;
}

.search-dropdown {
  @apply absolute w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-700;
}
</style>
