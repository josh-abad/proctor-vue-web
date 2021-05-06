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
import { ENROLL_STUDENT } from '@/store/action-types'
import { User } from '@/types'
import { computed, defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'EnrollmentPage',
  components: { AppDropdown, AppButton, Center, AppPanel },
  props: {
    studentId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { setSnackbarMessage } = useSnackbar()
    const [
      student,
      fetchStudent,
      loadingStudent,
      errorLoadingStudent
    ] = useFetch<User | null>(() => usersService.getStudent(props.studentId))

    const [
      courses,
      fetchCourses
    ] = useFetch(() => coursesService.getAll(), [])

    const unenrolledCourses = computed(() => {
      return courses.value.filter(course => (
        student.value
          ? !course.studentsEnrolled.includes(student.value.id)
          : false
      ))
    })

    const options = computed(() => (
      unenrolledCourses.value.map(({ name, id }) => {
        return {
          text: name,
          value: id
        }
      })
    ))

    Promise.all([
      fetchStudent(),
      fetchCourses()
    ])

    return {
      student,
      loadingStudent,
      errorLoadingStudent,
      availableCourses: options,
      setSnackbarMessage
    }
  },
  data () {
    return {
      selectedCourse: ''
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
        this.setSnackbarMessage(error.response.data.error)
      }
    }
  }
})
</script>
