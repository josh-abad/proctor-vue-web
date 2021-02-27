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
            <template #label>Create Exam</template>
          </MenuDropdownItem>
          <MenuDropdownItem :path="`/courses/${courseId}/edit`">
            <template #label>Edit Course</template>
          </MenuDropdownItem>
          <MenuDropdownItem id="btn-open" @item-click="deleteModalOpen = true">
            <template #label>Delete Course</template>
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
          <AppButton @click="deleteCourse" prominent> Delete </AppButton>
        </template>
      </AppModal>
    </teleport>
    <div class="flex flex-col sm:flex-row mt-4">
      <div class="flex-grow mr-0 sm:mr-4">
        <TabRow :course-id="courseId" />
        <AppPanel class="overflow-hidden rounded-t-none border-t-0">
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </AppPanel>
      </div>
      <div class="w-full sm:w-72 mt-4 sm:mt-0">
        <CoursePageAbout
          :student-count="course.studentsEnrolled.length"
          :description="course.description"
          :coordinator-name="course.coordinator.fullName"
          :coordinator-avatar-url="course.coordinator.avatarUrl"
        />
        <CoursePageUpcomingExams class="mt-4" :course-name="course.name" />
        <CoursePageProgress class="mt-4" :course-id="courseId" />
      </div>
    </div>
  </div>
  <Center v-else>
    <div class="flex flex-col items-center">
      <p class="text-2xl font-thin">Sorry, that course cannot be found.</p>
      <AppButton class="mt-3" @click="$router.push('/courses')" prominent
        >Go to courses</AppButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import CoursePageAbout from './components/CoursePageAbout.vue'
import CoursePageProgress from './components/CoursePageProgress.vue'
import CoursePageUpcomingExams from './components/CoursePageUpcomingExams.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import Center from '@/components/Center.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { Course, Link } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import AppModal from '@/components/ui/AppModal.vue'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import TabRow from './components/TabRow.vue'
import usersService from '@/services/users'

export default defineComponent({
  name: 'CoursePage',
  components: { AppButton, AppPanel, Center, AppLabel, PageHeader, CoursePageAbout, ProgressBar, CoursePageProgress, CoursePageUpcomingExams, AppModal, MenuDropdown, MenuDropdownItem, TabRow },
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
  async mounted () {
    if (!this.hasPermission(['admin']) && !this.$store.getters.hasCourse(this.courseId)) {
      this.$router.replace('/')
    }
    document.title = this.course ? `${this.course.name} - Proctor Vue` : 'Course Not Found - Proctor Vue'
    try {
      await usersService.addRecentCourse(this.user?.id ?? '', this.courseId)
    } catch (error) { }
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
</style>
