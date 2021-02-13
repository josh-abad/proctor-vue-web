<template>
  <div v-if="course" class="p-4">
    <PageHeader
      :links="links"
      @menu-clicked="menuOpen = !menuOpen"
      :hide-menu="!hasPermission(['coordinator', 'admin'])"
    >
      <template #label>{{ course.name }}</template>
      <template #menu>
        <MenuDropdown
          class="mt-2 mr-2"
          v-show="menuOpen"
          @click-outside="menuOpen = false"
        >
          <MenuDropdownItem :path="`/courses/${courseId}/exams/new`">
            Create Exam
          </MenuDropdownItem>
          <MenuDropdownItem :path="`/courses/${courseId}/edit`">
            Edit Course
          </MenuDropdownItem>
          <MenuDropdownItem id="btn-open" @item-click="deleteModalOpen = true">
            Delete Course
          </MenuDropdownItem>
        </MenuDropdown>
      </template>
    </PageHeader>
    <teleport to="#modals">
      <AppModal :open="deleteModalOpen" @close="deleteModalOpen = false">
        <template #header> Delete Course </template>
        <template #body>
          Are you sure you want to delete this course?
        </template>
        <template #action>
          <BaseButton @click="deleteCourse" prominent> Delete </BaseButton>
        </template>
      </AppModal>
    </teleport>
    <div class="flex mt-4">
      <div class="flex-grow mr-4">
        <div
          class="flex space-x-2 text-gray-500 bg-gray-100 rounded-t-lg shadow dark:bg-dark-01 label-border"
        >
          <router-link :to="`/courses/${courseId}`" class="tab">
            Overview
          </router-link>
          <router-link :to="`/courses/${courseId}/students`" class="tab">
            Students
          </router-link>
          <router-link :to="`/courses/${courseId}/grades`" class="tab">
            Grades
          </router-link>
        </div>
        <BasePanel class="overflow-hidden rounded-t-none">
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
      <p class="text-2xl font-thin">Sorry, that course cannot be found.</p>
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
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'

export default defineComponent({
  name: 'CoursePage',
  components: { BaseButton, BasePanel, Center, BaseLabel, PageHeader, CoursePageAbout, ProgressBar, CoursePageProgress, CoursePageUpcomingExams, AppModal, MenuDropdown, MenuDropdownItem },
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
  @apply px-6 py-2 text-center hover:text-gray-900 dark:hover:text-white transition-colors ease-in-out duration-300;
}

.router-link-active {
  @apply rounded-t-lg font-semibold text-gray-900 dark:text-white border-b-2 border-green-500;
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
  @apply block px-4 py-2 text-sm hover:bg-gray-800 dark:hover:bg-gray-100 hover:bg-opacity-10 dark:hover:bg-opacity-10;
}
</style>
