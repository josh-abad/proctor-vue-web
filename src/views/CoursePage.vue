<template>
  <div v-if="course">
    <BasePanel>
      <h1 class="text-3xl">{{ course.name }}</h1>
      <!-- <div v-show="course.coordinator">
        Coordinator {{ coordinatorFullName }}
      </div> -->
      <Breadcrumbs class="mt-2" :links="links" />
    </BasePanel>
    <BasePanel class="mt-4">
      <div v-for="exam in exams" :key="exam.id">
        <router-link :to="`/courses/${courseId}/exams/${exam.id}`">{{
          exam.label
        }}</router-link>
      </div>
    </BasePanel>
    <div class="mt-4" v-show="userRole === 'admin'">
      <div class="uppercase font-semibold tracking-wide text-xs">
        Admin Options
      </div>
      <div class="mt-4 flex">
        <div>
          <BaseButton @click="editCourse">Edit Course</BaseButton>
        </div>
        <div class="ml-2">
          <BaseButton @click="deleteCourse">Delete Course</BaseButton>
        </div>
      </div>
    </div>
    <div class="mt-4" v-show="userRole === 'coordinator'">
      <BaseButton @click="$router.push(`/courses/${courseId}/exams/new`)"
        >Create Exam</BaseButton
      >
    </div>
  </div>
  <div v-else class="fixed inset-0">
    <div class="flex justify-center items-center">
      <Center />
      <div class="flex flex-col items-center">
        <p class="font-thin text-2xl">Sorry, that course cannot be found.</p>
        <BaseButton class="mt-3" @click="$router.push('/courses')" prominent
          >Go to courses</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BasePanel from '@/components/BasePanel.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Center from '@/components/Center.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE, DISPLAY_DIALOG } from '@/store/mutation-types'
import { Course, DialogContent, Exam, Link, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, Breadcrumbs, BasePanel, Center },
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
