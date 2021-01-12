<template>
  <div class="relative w-full">
    <div class="flex">
      <BaseInput
        type="text"
        placeholder="Search courses"
        v-model="searchFilter"
        @focus="open = true"
        v-click-outside="{
          handler: handleClose,
          middleware: clickOutsideMiddleware,
        }"
        class="w-80 shadow-none bg-opacity-50 dark:bg-opacity-50 rounded-full"
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
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        class="absolute mt-1 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        v-show="open && filteredCourses.length"
      >
        <ul
          id="results"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-56 rounded-md py-1 text-base ring-1 ring-gray-900 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <li
            id="listbox-item-0"
            role="option"
            class="text-gray-900 dark:text-white cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-green-600"
            v-for="(option, i) in filteredCourses"
            :key="i"
            @click="$router.push(`/courses/${option.id}`)"
          >
            <span class="ml-3 block truncate">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BaseInput from './BaseInput.vue'

export default defineComponent({
  name: 'NavBarSearch',
  components: { BaseInput },
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
  width: 5px;
}

::-webkit-scrollbar-track {
  @apply bg-white;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}
</style>
