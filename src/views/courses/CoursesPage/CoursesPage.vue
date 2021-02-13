<template>
  <div class="p-4">
    <PageHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]"
      @menu-clicked="isOpen = !isOpen"
      :hide-menu="!hasPermission(['admin'])"
    >
      <template #label>Courses</template>
      <template #menu>
        <MenuDropdown
          class="mt-2 mr-2"
          v-show="isOpen"
          @click-outside="isOpen = false"
        >
          <MenuDropdownItem path="/courses/new">
            Create Course
          </MenuDropdownItem>
        </MenuDropdown>
      </template>
    </PageHeader>
    <BasePanel class="mt-4 mb-0">
      <div class="flex items-center justify-between pb-2 -mb-3 label-border">
        <div class="text-lg font-bold">Your Courses</div>
        <div class="flex items-center" v-if="courses.length">
          <ViewToggle v-model="viewMode" value="card" class="mr-3">
            <!-- Heroicon name: view-grid -->
            <svg
              class="w-5 h-5 fill-current"
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
              class="w-5 h-5 fill-current"
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
          class="flex items-center justify-center h-40 my-3"
        >
          <div class="text-xl font-semibold text-gray-500">
            You don't have any courses.
          </div>
        </div>
        <div v-else-if="viewMode === 'card'" class="mt-8">
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
            <div v-if="loaded" class="separator-y">
              <CoursesPageListItem
                :course="course"
                :key="course.id"
                v-for="course in courses"
              />
            </div>
            <div v-else class="separator-y">
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
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import CoursesPageListItem from './components/CoursesPageListItem.vue'
import SkeletonCourseListItem from './components/SkeletonCourseListItem.vue'
import ViewToggle from '@/components/ViewToggle.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'

export default defineComponent({
  name: 'CoursesPage',
  components: { CoursesPageCard, BasePanel, PageHeader, CoursesPageListItem, SkeletonCourseListItem, ViewToggle, MenuDropdown, MenuDropdownItem },
  mixins: [userMixin],
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
  @apply opacity-100 duration-200 ease-in-out transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
