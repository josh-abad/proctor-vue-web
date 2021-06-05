<template>
  <div v-if="error">Could not load course.</div>
  <div v-else-if="loading">
    <div class="p-4">
      <AppSkeleton class="w-full h-28 rounded-xl" />
      <div class="flex flex-col mt-4 sm:flex-row">
        <div class="flex-grow mr-0 sm:mr-4">
          <TabRow :course-id="courseId" />
          <AppPanel class="overflow-hidden border-t-0 rounded-t-none">
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </AppPanel>
        </div>
        <div class="w-full mt-4 sm:w-72 sm:mt-0">
          <About />
          <UpcomingExams class="mt-4" />
          <Progress class="mt-4" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="course" class="p-4">
      <PageHeader
        :links="links"
        @menu-clicked="menuDropdown.toggle"
        :hide-menu="!$store.getters.permissions(['coordinator', 'admin'])"
      >
        <template #label>{{ course.name }}</template>
        <template #menu>
          <MenuDropdown
            class="mt-2 mr-2"
            v-show="menuDropdown.isOpen"
            @click-outside="menuDropdown.close"
          >
            <MenuDropdownItem :path="`/courses/${courseId}/exams/new`">
              <template #label>Create Exam</template>
            </MenuDropdownItem>
            <MenuDropdownItem :path="`/courses/${courseId}/edit`">
              <template #label>Edit Course</template>
            </MenuDropdownItem>
            <MenuDropdownItem @item-click="deleteCourseModal.open" separator>
              <template #label>Delete Course</template>
            </MenuDropdownItem>
          </MenuDropdown>
        </template>
      </PageHeader>
      <teleport to="#modals">
        <AppModal
          :open="deleteCourseModal.isOpen"
          @close="deleteCourseModal.close"
        >
          <template #header> Delete Course </template>
          <template #body>
            Are you sure you want to delete this course?
          </template>
          <template #action>
            <AppButton @click="deleteCourse" prominent> Delete </AppButton>
          </template>
        </AppModal>
      </teleport>
      <div class="flex flex-col mt-4 sm:flex-row">
        <div class="flex-grow mr-0 sm:mr-4">
          <TabRow :course-id="courseId" />
          <AppPanel class="overflow-hidden border-t-0 rounded-t-none">
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </AppPanel>
        </div>
        <div class="w-full mt-4 sm:w-72 sm:mt-0">
          <CoursePageAbout
            :student-count="course.studentsEnrolled.length"
            :description="course.description"
            :coordinator-name="course.coordinator.fullName"
          />
          <CoursePageUpcomingExams class="mt-4" :course-id="course.id" />
          <CoursePageProgress class="mt-4" :course-id="courseId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { Link } from '@/types'
import { defineComponent } from 'vue'
import coursesService from '@/services/courses'
import useFetch from '@/composables/use-fetch'
import { DELETE_COURSE } from '@/store/action-types'
import CoursePageUpcomingExams from './components/CoursePageUpcomingExams.vue'
import CoursePageProgress from './components/CoursePageProgress.vue'
import CoursePageAbout from './components/CoursePageAbout.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import TabRow from './components/TabRow.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import About from './components/fallback/components/About.vue'
import UpcomingExams from './components/fallback/components/UpcomingExams.vue'
import Progress from './components/fallback/components/Progress.vue'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import userService from '@/services/user'
import useSnackbar from '@/composables/use-snackbar'
import useModal from '@/composables/use-modal'
import useTitle from '@/composables/use-title'

export default defineComponent({
  name: 'CoursePage',
  components: {
    AppPanel,
    CoursePageProgress,
    CoursePageAbout,
    CoursePageUpcomingExams,
    PageHeader,
    TabRow,
    AppSkeleton,
    About,
    UpcomingExams,
    Progress,
    MenuDropdown,
    MenuDropdownItem,
    AppModal,
    AppButton
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { setSnackbarMessage } = useSnackbar()

    const deleteCourseModal = useModal()

    const menuDropdown = useModal()

    const [course, fetchCourse, loading, error] = useFetch(() =>
      coursesService.getCourse(props.courseId)
    )

    const { setTitle } = useTitle()

    fetchCourse().then(() => {
      setTitle(
        course.value
          ? `${course.value.name} - Proctor Vue`
          : 'Course Not Found - Proctor Vue'
      )
    })

    return {
      course,
      loading,
      error,
      setSnackbarMessage,
      deleteCourseModal,
      menuDropdown
    }
  },
  computed: {
    links(): Link[] {
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
          name: this.course?.name,
          url: `/courses/${this.courseId}`
        }
      ]
    }
  },
  async mounted() {
    if (
      !this.$store.getters.permissions(['admin']) &&
      !this.$store.getters.hasCourse(this.courseId)
    ) {
      this.$router.replace('/')
    }

    try {
      await userService.addRecentCourse(this.courseId)
    } catch (error) {
      this.setSnackbarMessage(error.message, 'error')
    }
  },
  methods: {
    deleteCourse() {
      this.$store.dispatch(DELETE_COURSE, this.courseId)
      this.$router.push('/courses')
    },
    editCourse() {
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
