<template>
  <div v-if="course">
    <ColorHeader
      :links="links"
      @menu-clicked="menuOpen = !menuOpen"
      :hide-menu="!hasPermission(['coordinator', 'admin'])"
      >{{ course.name }}</ColorHeader
    >
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      v-show="menuOpen"
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
            :to="`/courses/${courseId}/exams/new`"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >Create Exam</router-link
          >
          <router-link
            :to="`/courses/${courseId}/edit`"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >Edit Course</router-link
          >
          <button
            @click="deleteModalOpen = true"
            class="block w-full text-left px-4 py-2 text-sm border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            role="menuitem"
          >
            Delete Course
          </button>
          <teleport to="#modals">
            <DialogModal
              v-show="deleteModalOpen"
              header="Delete Course"
              message="Are you sure you want to delete this course?"
              action-label="Delete"
              @cancel="deleteModalOpen = false"
              @confirm="deleteCourse"
            />
          </teleport>
        </div>
      </div>
    </transition>
    <div class="flex mt-4">
      <div class="flex-grow mr-4">
        <div
          class="flex space-x-2 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-t-lg shadow border-b border-gray-300 dark:border-gray-700"
        >
          <router-link :to="`/courses/${courseId}`" class="tab">
            Overview
          </router-link>
          <router-link :to="`/courses/${courseId}/students`" class="tab">
            Students
          </router-link>
        </div>
        <BasePanel class="rounded-t-none pt-2 overflow-hidden">
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </BasePanel>
      </div>
      <div class="w-72">
        <CoursePageAbout
          :student-count="course.studentsEnrolled.length"
          :description="course.description"
          :coordinator-name="course.coordinator.fullName"
          :coordinator-avatar-url="course.coordinator.avatarUrl"
        />
        <BasePanel class="mt-4">
          <BaseLabel emphasis>Course Progress</BaseLabel>
          <ProgressBar
            class="mt-2"
            :percentage="$store.getters.courseCompletedPercentage(courseId)"
          />
        </BasePanel>
      </div>
    </div>
  </div>
  <Center v-else>
    <div class="flex flex-col items-center">
      <p class="font-thin text-2xl">Sorry, that course cannot be found.</p>
      <BaseButton class="mt-3" @click="$router.push('/courses')" prominent
        >Go to courses</BaseButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import CoursePageAbout from '@/components/CoursePageAbout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import ColorHeader from '@/components/ColorHeader.vue'
import DialogModal from '@/components/DialogModal.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE } from '@/store/mutation-types'
import { Course, Link } from '@/types'
import { defineComponent } from 'vue'
import roleMixin from '@/mixins/role'

export default defineComponent({
  name: 'CoursePage',
  components: { BaseButton, BasePanel, Center, BaseLabel, ColorHeader, CoursePageAbout, ProgressBar, DialogModal },
  mixins: [roleMixin],
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menuOpen: false,
      deleteModalOpen: false
    }
  },
  computed: {
    links (): Link[] {
      return [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Courses',
          url: '/courses'
        },
        {
          name: this.course.name,
          url: `/courses/${this.courseId}`
        }
      ]
    },
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    }
  },
  mounted () {
    if (!this.hasPermission(['admin']) && !this.$store.getters.hasCourse(this.courseId)) {
      this.$router.replace('/')
    }
    document.title = this.course ? `${this.course.name} - Proctor Vue` : 'Course Not Found - Proctor Vue'
    this.$store.commit(ADD_RECENT_COURSE, this.courseId)
  },
  methods: {
    deleteCourse (): void {
      this.$store.dispatch(DELETE_COURSE, this.courseId)
      this.$router.push('/courses')
    },
    editCourse (): void {
      // TODO: implement editing courses
    }
  }
})
</script>

<style lang="postcss" scoped>
.tab {
  @apply px-6 py-2 text-center dark:hover:text-white;
}

.router-link-active {
  @apply rounded-t-lg font-semibold text-gray-900 dark:text-white border-b-2 border-green-500;
}

.slide-left-enter-active,
.slide-right-enter-active {
  @apply transition-all duration-300 ease-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  @apply transition-all duration-300 ease-in;
}

.slide-left-enter-from,
.slide-right-leave-to {
  @apply transform-gpu translate-x-40 opacity-0;
}

.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from {
  @apply transform-gpu translate-x-0 opacity-100;
}

.slide-right-enter-from,
.slide-left-leave-to {
  @apply transform-gpu -translate-x-5 opacity-0;
}
</style>
