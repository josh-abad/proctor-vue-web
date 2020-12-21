<template>
  <div v-if="course" class="py-4">
    <div class="bg-white dark:bg-gray-800 shadow py-3 px-4 rounded-xl">
      <h1 class="text-3xl">{{ course.name }}</h1>
      <p class="pt-2 dark:text-gray-500">Home > Courses > <span class="dark:text-green-500">Code</span></p>
    </div>
    <div v-for="exam in exams" :key="exam.id">
      <router-link :to="`/exams/${exam.id}/attempts`">{{ exam.label }}</router-link>
    </div>
    <div class="mt-4" v-show="userRole === 'admin'">
      <div class="uppercase font-semibold tracking-wide text-xs">Admin Options</div>
      <div class="mt-4 flex">
        <div>
          <BaseButton @click="editCourse" label="Edit Course" />
  </div>
        <div class="ml-2">
          <BaseButton @click="deleteCourse" label="Delete Course" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-40 inset-0 object-center min-h-screen">
    <p class="text-2xl font-semibold uppercase tracking-wider dark:text-gray-200">Course not found</p>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE, DISPLAY_DIALOG } from '@/store/mutation-types'
import { Course, DialogContent, Exam, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton },
  name: 'CoursePage',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$store.commit(ADD_RECENT_COURSE, this.courseId)
  },
  computed: {
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    exams (): Exam[] {
      return this.$store.getters.getExamsByCourse(this.courseId)
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
