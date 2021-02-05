<template>
  <div v-if="course" class="p-4">
    <PageHeader
      :links="links"
      @menu-clicked="menuOpen = !menuOpen"
      :hide-menu="!hasPermission(['coordinator', 'admin'])"
      >{{ course.name }}</PageHeader
    >
    <transition name="dropdown-fade" v-show="menuOpen">
      <div
        class="origin-top-right z-10 absolute right-0 -mt-24 mr-20 w-56 rounded-lg shadow-lg bg-dark-08 text-white"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <router-link
            :to="`/courses/${courseId}/exams/new`"
            class="link"
            role="menuitem"
            >Create Exam</router-link
          >
          <router-link
            :to="`/courses/${courseId}/edit`"
            class="link"
            role="menuitem"
            >Edit Course</router-link
          >
          <button
            @click="deleteModalOpen = true"
            id="btn-open"
            class="link w-full text-left border-t border-gray-700 focus:outline-none"
            role="menuitem"
          >
            Delete Course
          </button>
          <teleport to="#modals">
            <AppModal :open="deleteModalOpen" @close="deleteModalOpen = false">
              <template #header> Delete Course </template>
              <template #body>
                Are you sure you want to delete this course?
              </template>
              <template #action>
                <BaseButton @click="deleteCourse" prominent>
                  Delete
                </BaseButton>
              </template>
            </AppModal>
          </teleport>
        </div>
      </div>
    </transition>
    <div class="flex mt-4">
      <div class="flex-grow mr-4">
        <div
          class="flex space-x-2 text-gray-500 bg-dark-01 rounded-t-lg shadow border-b border-gray-700"
        >
          <router-link :to="`/courses/${courseId}`" class="tab">
            Overview
          </router-link>
          <router-link :to="`/courses/${courseId}/students`" class="tab">
            Students
          </router-link>
        </div>
        <BasePanel class="rounded-t-none overflow-hidden">
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
        <CoursePageUpcomingExams class="mt-4" :courseName="course.name" />
        <CoursePageProgress class="mt-4" :courseId="courseId" />
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
import CoursePageAbout from './components/CoursePageAbout.vue'
import CoursePageProgress from './components/CoursePageProgress.vue'
import CoursePageUpcomingExams from './components/CoursePageUpcomingExams.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE } from '@/store/mutation-types'
import { Course, Link } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import AppModal from '@/components/AppModal.vue'

export default defineComponent({
  name: 'CoursePage',
  components: { BaseButton, BasePanel, Center, BaseLabel, PageHeader, CoursePageAbout, ProgressBar, CoursePageProgress, CoursePageUpcomingExams, AppModal },
  mixins: [userMixin],
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
          name: this.course ? this.course.name : '',
          url: `/courses/${this.courseId}`
        }
      ]
    },
    course (): Course | undefined {
      return this.$store.getters.courseByID(this.courseId)
    }
  },
  created () {
    this.$watch(
      () => this.$route.params,
      (toParams: { courseId?: string }) => {
        if (toParams.courseId) {
          const course: Course | undefined = this.$store.getters.courseByID(toParams.courseId)
          document.title = `${course?.name || 'Course Not Found'} - Proctor Vue`
        }
      }
    )
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
  @apply px-6 py-2 text-center hover:text-white;
}

.router-link-active {
  @apply rounded-t-lg font-semibold text-white border-b-2 border-green-500;
}

.slide-left-enter-active,
.slide-right-enter-active {
  @apply transition-transform duration-200 ease-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  @apply transition-transform duration-200 ease-in;
}

.slide-left-enter-from,
.slide-right-leave-to {
  @apply transform-gpu translate-x-full;
}

.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from {
  @apply transform-gpu translate-x-0;
}

.slide-right-enter-from,
.slide-left-leave-to {
  @apply transform-gpu -translate-x-full;
}

.link {
  @apply block px-4 py-2 text-sm hover:bg-gray-700;
}
</style>
