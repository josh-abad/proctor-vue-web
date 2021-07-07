<template>
  <div class="relative w-full">
    <div class="flex">
      <AppInput
        type="text"
        placeholder="Search courses"
        v-model="searchFilter"
        @focus="open = true"
        v-click-outside="handleClickOutside"
        class="
          w-80
          text-gray-900
          border-0
          shadow-none
          dark:text-white
          bg-gray-900/10
          dark:bg-white/5
        "
      />
      <button
        :aria-label="searchFilter ? 'Clear Search Filter' : 'Search'"
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
    <DropdownFadeTransition>
      <div
        class="
          absolute
          mt-2
          w-full
          bg-white
          rounded-lg
          shadow-lg
          dark:bg-gray-700
        "
        v-show="open && filteredCourses.length"
      >
        <ul class="overflow-auto py-1 max-h-56 rounded-lg sm:text-sm">
          <Result
            @result-click="$router.push(`/courses/${option.slug}`)"
            v-for="(option, i) in filteredCourses"
            :key="i"
          >
            {{ option.name }}
          </Result>
        </ul>
      </div>
    </DropdownFadeTransition>
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
import DropdownFadeTransition from '@/components/transitions/DropdownFadeTransition.vue'

export default defineComponent({
  name: 'Search',
  components: { AppInput, Result, SearchIcon, XIcon, DropdownFadeTransition },
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
</style>
