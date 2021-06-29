<template>
  <div class="p-4">
    <FadeTransition>
      <div v-if="hasError">Could not load course.</div>
      <SkeletonPageHeading v-else-if="isLoading" />
      <PageHeading
        v-else-if="course"
        :links="[
          {
            name: 'Home',
            url: '/'
          },
          {
            name: 'Courses',
            url: '/courses'
          }
        ]"
      >
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
        <template #meta>
          <PageHeadingMeta>
            <PageHeadingMetaItem>
              <template #icon>
                <UserGroupIcon />
              </template>
              <template #content>
                {{ course.studentsEnrolled.length }}
                {{
                  course.studentsEnrolled.length !== 1 ? 'students' : 'student'
                }}
              </template>
            </PageHeadingMetaItem>
            <PageHeadingMetaItem>
              <template #icon>
                <CalendarIcon />
              </template>
              <template #content>
                {{ course.weeks }} {{ course.weeks !== 1 ? 'weeks' : 'week' }}
              </template>
            </PageHeadingMetaItem>
            <PageHeadingMetaItem>
              <template #icon>
                <UserIcon />
              </template>
              <template #content>
                Coordinated by {{ course.coordinator.fullName }}
              </template>
            </PageHeadingMetaItem>
          </PageHeadingMeta>
        </template>
      </PageHeading>
    </FadeTransition>
    <div class="flex flex-col mt-8 sm:flex-row">
      <div class="flex-grow mr-0 sm:mr-4">
        <TabRow>
          <Tab :to="`/courses/${slug}`"> Overview </Tab>
          <Tab :to="`/courses/${slug}/students`"> Students </Tab>
          <Tab :to="`/courses/${slug}/grades`"> Grades </Tab>
          <Tab
            v-if="$store.getters.permissions(['coordinator', 'admin'])"
            :to="`/courses/${slug}/activity`"
          >
            Activity
          </Tab>
        </TabRow>
        <AppPanel class="rounded-t-none">
          <router-view v-slot="{ Component }">
            <FadeTransition>
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </FadeTransition>
          </router-view>
        </AppPanel>
      </div>
      <div class="w-full mt-4 sm:w-72 sm:mt-0">
        <CoursePageAbout :slug="slug" />
        <CoursePageUpcomingExams class="mt-4" :slug="slug" />
        <CoursePageProgress class="mt-4" :slug="slug" />
        <AppPanel
          class="px-3 py-3 mt-4"
          v-if="$store.getters.permissions(['coordinator', 'admin'])"
        >
          <AddExternalLinkModal class="w-full" @add="addExternalLink" />
        </AppPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { defineComponent, ref } from 'vue'
import coursesService from '@/services/courses'
import CoursePageUpcomingExams from './components/CoursePageUpcomingExams.vue'
import CoursePageProgress from './components/CoursePageProgress.vue'
import CoursePageAbout from './components/CoursePageAbout.vue'
import PageHeading from '@/components/PageHeading.vue'
import TabRow from './components/TabRow.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import About from './components/fallback/components/About.vue'
import UpcomingExams from './components/fallback/components/UpcomingExams.vue'
import Progress from './components/fallback/components/Progress.vue'
import AppButton from '@/components/ui/AppButton.vue'
import userService from '@/services/user'
import useTitle from '@/composables/use-title'
import SkeletonPageHeading from '@/components/SkeletonPageHeading.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/vue/solid'
import PageHeadingMetaItem from '@/components/PageHeadingMetaItem.vue'
import PageHeadingMeta from '@/components/PageHeadingMeta.vue'
import useSnackbar from '@/composables/use-snackbar'
import NProgress from 'nprogress'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import AddExternalLinkModal from '@/components/AddExternalLinkModal.vue'
import { NewExternalLink } from '@/types'
import useCourse from '@/composables/use-course'
import Tab from './components/Tab.vue'

export default defineComponent({
  name: 'CoursePage',
  components: {
    AppPanel,
    CoursePageProgress,
    CoursePageAbout,
    CoursePageUpcomingExams,
    PageHeading,
    TabRow,
    AppSkeleton,
    About,
    UpcomingExams,
    Progress,
    AppButton,
    SkeletonPageHeading,
    ModalButton,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    UserIcon,
    UserGroupIcon,
    CalendarIcon,
    PageHeadingMetaItem,
    PageHeadingMeta,
    FadeTransition,
    AddExternalLinkModal,
    Tab
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { setSnackbarMessage } = useSnackbar()

    const deleteCourseModal = ref(false)

    const { course, fetchCourse, isLoading, hasError } = useCourse(props.slug)

    const { setTitle } = useTitle()

    NProgress.start()
    fetchCourse()
      .then(() => {
        if (course.value) {
          setTitle(
            course.value
              ? `${course.value.name} - Proctor Vue`
              : 'Course Not Found - Proctor Vue'
          )

          userService.addRecentCourse(course.value.id)
        }
      })
      .finally(NProgress.done)

    return {
      course,
      isLoading,
      hasError,
      deleteCourseModal,
      setSnackbarMessage
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
    async deleteCourse() {
      try {
        NProgress.start()
        await coursesService.deleteCourse(this.slug)
        this.setSnackbarMessage('Course successfully deleted', 'success')
        await this.$router.push('/courses')
      } catch (error) {
        this.setSnackbarMessage('Could not delete course', 'error')
      } finally {
        NProgress.done()
      }
    },
    editCourse() {
      // TODO: implement editing courses
    },
    async addExternalLink(externalLink: NewExternalLink) {
      if (this.course) {
        try {
          NProgress.start()
          const updatedCourse = await coursesService.addExternalLink(
            this.course.id,
            {
              ...externalLink,
              description: externalLink.description || undefined
            }
          )
          this.course = {
            ...this.course,
            externalLinks: updatedCourse.externalLinks
          }
          this.setSnackbarMessage('External link successfully added', 'success')
        } catch (error) {
          this.setSnackbarMessage('Could not add external link', 'error')
        } finally {
          NProgress.done()
        }
      }
    }
  }
})
</script>
