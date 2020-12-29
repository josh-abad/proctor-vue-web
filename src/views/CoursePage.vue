<template>
  <div v-if="course">
    <BasePanel>
      <h1 class="text-3xl">{{ course.name }}</h1>
      <Breadcrumbs class="mt-2" :links="links" />
    </BasePanel>
    <div class="mt-4 flex">
      <BasePanel class="mr-4 pt-2 flex-grow">
        <div
          v-if="course.weeks"
          class="flex flex-col space-y-4 divide-y divide-gray-300 dark:divide-gray-700 div"
        >
          <div v-for="week in course.weeks" :key="week">
            <BaseLabel class="mt-4 mb-2" emphasis> Week {{ week }} </BaseLabel>
            <div
              class="text-base font-normal flex items-center"
              v-for="exam in exams.filter((exam) => exam.week === week)"
              :key="exam.id"
            >
              <svg
                v-if="$store.getters.examTaken(exam.id)"
                class="stroke-current text-green-500 w-5 h-5"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <svg
                v-else
                class="stroke-current text-gray-400 dark:text-gray-600 w-5 h-5"
                viewBox="0 0 24 24"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              <router-link
                :to="`/courses/${courseId}/exams/${exam.id}`"
                class="ml-2"
                >{{ exam.label }}</router-link
              >
            </div>
          </div>
        </div>
      </BasePanel>
      <div class="w-72">
        <BasePanel>
          <BaseLabel emphasis>About course</BaseLabel>
          <div class="text-sm">
            {{ course.description }}
          </div>
          <div class="mt-4">
            <div>{{ course.studentsEnrolled.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{
                course.studentsEnrolled.length === 1 ? "Student" : "Students"
              }}
              Enrolled
            </div>
          </div>
          <BaseLabel class="mt-4" emphasis> Course Coordinator </BaseLabel>
          <div>
            {{ course.coordinator.name.first }}
            {{ course.coordinator.name.last }}
          </div>
        </BasePanel>
        <BasePanel v-if="$store.getters.permissions('admin')" class="mt-4">
          <BaseLabel emphasis>Admin options</BaseLabel>
          <div class="mt-2">
            <div>
              <BaseButton class="w-full" @click="editCourse"
                >Edit Course</BaseButton
              >
            </div>
            <div class="mt-2">
              <BaseButton class="w-full" @click="deleteCourse"
                >Delete Course</BaseButton
              >
            </div>
          </div>
        </BasePanel>
        <BasePanel
          v-if="$store.getters.permissions('coordinator', 'admin')"
          class="mt-4"
        >
          <BaseLabel emphasis>Coordinator options</BaseLabel>
          <div class="mt-2">
            <div>
              <BaseButton
                class="w-full"
                @click="$router.push(`/courses/${courseId}/exams/new`)"
                >Create Exam</BaseButton
              >
            </div>
          </div>
        </BasePanel>
      </div>
    </div>
    <div class="mt-4" v-show="userRole === 'coordinator'"></div>
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
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Center from '@/components/Center.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE, DISPLAY_DIALOG } from '@/store/mutation-types'
import { Course, DialogContent, Exam, Link, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, Breadcrumbs, BasePanel, Center, BaseLabel },
  name: 'CoursePage',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  mounted () {
    document.title = this.course ? `${this.course.name} | Proctor Vue` : 'Course Not Found | Proctor Vue'
    this.$store.commit(ADD_RECENT_COURSE, this.courseId)
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
    },
    exams (): Exam[] {
      return this.$store.getters.getExamsByCourse(this.courseId)
    },
    coordinatorFullName (): string {
      if (this.course.coordinator) {
        const { first, last } = this.course.coordinator.name
        return `${first} ${last}`
      }
      return ''
    },
    userRole (): Role {
      return this.$store.getters.userRole
    }
  },
  methods: {
    deleteCourse (): void {
      const dialogContent: Omit<DialogContent, 'closed'> = {
        header: 'Delete Course',
        message: 'Are you sure you want to delete this course?',
        actionLabel: 'Delete'
      }
      this.$store.commit(DISPLAY_DIALOG, dialogContent)

      this.$emitter.on('closedDialog', (confirmDelete: boolean) => {
        if (confirmDelete) {
          this.$store.dispatch(DELETE_COURSE, this.courseId)
          this.$router.push('/courses')
        }
        this.$emitter.all.clear()
      })
    },
    editCourse (): void {
      console.log('edited course')
    }
  }
})
</script>
