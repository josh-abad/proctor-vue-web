<template>
  <Center v-if="student">
    <AppPanel>
      <div class="flex flex-col items-center">
        <div>Enroll {{ student.fullName }}</div>
        <AppDropdown
          :options="availableCourses"
          v-model="selectedCourse"
          class="w-full"
        />
        <AppButton @click="handleEnroll">Enroll</AppButton>
      </div>
    </AppPanel>
  </Center>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppDropdown from '@/components/ui/AppDropdown.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import Center from '@/components/Center.vue'
import { ALERT, ENROLL_STUDENT } from '@/store/action-types'
import { Course, Option, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EnrollmentPage',
  components: { AppDropdown, AppButton, Center, AppPanel },
  props: {
    studentId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selectedCourse: ''
    }
  },
  computed: {
    student (): User | undefined {
      return this.$store.getters.studentByID(this.studentId)
    },
    availableCourses (): Option[] {
      const courses: Course[] = this.$store.getters.courses
      const unenrolledCourses = (course: Course): boolean => {
        return this.student ? !course.studentsEnrolled.includes(this.student.id) : false
      }

      const options: Option[] = courses.filter(unenrolledCourses).map(course => {
        return {
          text: course.name,
          value: course.id
        }
      })
      return options
    }
  },
  methods: {
    async handleEnroll () {
      try {
        const payload = {
          studentId: this.studentId,
          courseId: this.selectedCourse
        }
        await this.$store.dispatch(ENROLL_STUDENT, payload)
        this.$router.push('/students')
      } catch (error) {
        this.$store.dispatch(ALERT, error.response.data.error)
      }
    }
  }
})
</script>
