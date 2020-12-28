<template>
  <Center>
    <BasePanel>
      <div class="flex flex-col items-center">
        <div>Enroll {{ student.name.first }} {{ student.name.last }}</div>
        <BaseDropdown
          :options="availableCourses"
          @selection-change="handleChange"
          class="w-full"
        />
        <BaseButton @click="handleEnroll">Enroll</BaseButton>
      </div>
    </BasePanel>
  </Center>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import { ENROLL_STUDENT } from '@/store/action-types'
import { Course, Option, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseDropdown, BaseButton, Center, BasePanel },
  name: 'EnrollmentPage',
  data () {
    return {
      selectedCourse: ''
    }
  },
  props: {
    studentId: {
      type: String,
      required: true
    }
  },
  methods: {
    handleChange (value: string): void {
      this.selectedCourse = value
    },
    async handleEnroll () {
      try {
        const payload = {
          studentId: this.studentId,
          courseId: this.selectedCourse
        }
        await this.$store.dispatch(ENROLL_STUDENT, payload)
        this.$router.push('/students')
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  },
  computed: {
    student (): User {
      return this.$store.getters.studentByID(this.studentId)
    },
    availableCourses (): Option[] {
      const courses: Course[] = this.$store.getters.courses
      const unenrolledCourses = (course: Course) => {
        return !course.studentsEnrolled.includes(this.student.id)
      }

      const options: Option[] = courses.filter(unenrolledCourses).map(course => {
        return {
          text: course.name,
          value: course.id
        }
      })
      return options
    }
  }
})
</script>
