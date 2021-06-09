<template>
  <div v-if="error">Could not load course.</div>
  <div v-else-if="loading">
    <div class="p-4">
      <AppSkeleton class="w-full h-28 rounded-xl" />
      <div class="flex flex-col mt-4 sm:flex-row">
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
      <PageHeader
        :links="links"
        @menu-clicked="menuDropdown = !menuDropdown"
        :hide-menu="!$store.getters.permissions(['coordinator', 'admin'])"
      >
        <template #label>{{ course.name }}</template>
        <template #menu>
          <MenuDropdown class="mt-2 mr-2" v-model="menuDropdown">
            <MenuDropdownItem :path="`/courses/${slug}/create-exam`">
              <template #label>Create Exam</template>
            </MenuDropdownItem>
            <MenuDropdownItem :path="`/courses/${slug}/edit`">
              <template #label>Edit Course</template>
            </MenuDropdownItem>
            <MenuDropdownItem @item-click="deleteCourseModal = true" separator>
              <template #label>Delete Course</template>
            </MenuDropdownItem>
          </MenuDropdown>
        </template>
      </PageHeader>
      <teleport to="#modals">
        <AppModal v-model="deleteCourseModal">
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
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import userService from '@/services/user'
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
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const deleteCourseModal = ref(false)

    const menuDropdown = ref(false)

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
