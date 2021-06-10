<template>
  <div v-if="error">Could not load course.</div>
  <div v-else-if="loading">
    <div class="p-4">
      <SkeletonPageHeader />
      <div class="flex flex-col mt-8 sm:flex-row">
        <div class="flex-grow mr-0 sm:mr-4">
          <TabRow :course-slug="slug" />
          <AppPanel class="border-t-0 rounded-t-none">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
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
      <PageHeader :links="links">
        <template #label>{{ course.name }}</template>
        <template
          #actions
          v-if="$store.getters.permissions(['coordinator', 'admin'])"
        >
          <div class="flex items-center">
            <router-link :to="`/courses/${slug}/create-exam`">
              <AppButton prominent>
                <span class="flex items-center">
                  <PlusIcon class="w-5 h-5" />
                  <span class="flex items-center">
                    <span class="ml-1.5">Create Exam</span>
                  </span>
                </span>
              </AppButton>
            </router-link>
            <AppButton class="ml-2">
              <span class="flex items-center">
                <PencilIcon class="w-5 h-5" />
                <span class="flex items-center">
                  <span class="ml-1.5">Edit</span>
                </span>
              </span>
            </AppButton>
            <ModalButton
              header="Delete Course"
              message="Are you sure you want to delete this course?"
              action-label="Delete"
              @confirm="deleteCourse"
              class="ml-2"
              danger
            >
              <span class="flex items-center">
                <TrashIcon class="w-5 h-5" />
                <span class="ml-1.5">Delete</span>
              </span>
            </ModalButton>
          </div>
        </template>
      </PageHeader>
      <div class="flex flex-col mt-8 sm:flex-row">
        <div class="flex-grow mr-0 sm:mr-4">
          <TabRow :course-slug="slug" />
          <AppPanel class="border-t-0 rounded-t-none">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
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
          <CoursePageProgress class="mt-4" :course-slug="slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { Link } from '@/types'
import { defineComponent, ref } from 'vue'
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
import AppButton from '@/components/ui/AppButton.vue'
import userService from '@/services/user'
import useTitle from '@/composables/use-title'
import SkeletonPageHeader from '@/components/SkeletonPageHeader.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/solid'

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
    AppButton,
    SkeletonPageHeader,
    ModalButton,
    PlusIcon,
    PencilIcon,
    TrashIcon
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const deleteCourseModal = ref(false)

    const [course, fetchCourse, loading, error] = useFetch(() =>
      coursesService.getCourse(props.slug)
    )

    const { setTitle } = useTitle()

    fetchCourse().then(() => {
      setTitle(
        course.value
          ? `${course.value.name} - Proctor Vue`
          : 'Course Not Found - Proctor Vue'
      )

      userService.addRecentCourse(course.value.id)
    })

    return {
      course,
      loading,
      error,
      deleteCourseModal
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
          url: `/courses/${this.slug}`
        }
      ]
    }
  },
  async mounted() {
    if (
      !this.$store.getters.permissions(['admin']) &&
      !this.$store.getters.hasCourse(this.slug)
    ) {
      this.$router.replace('/')
    }
  },
  methods: {
    deleteCourse() {
      this.$store.dispatch(DELETE_COURSE, this.slug)
      this.$router.push('/courses')
    },
    editCourse() {
      // TODO: implement editing courses
    }
  }
})
</script>
