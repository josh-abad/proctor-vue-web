<template>
  <AppButton id="btn-open" @click="modal = true">Add Student</AppButton>
  <teleport to="#modals">
    <AppModal v-model="modal">
      <template #header>Choose Students</template>
      <template #body>
        <div class="mt-4">
          <AppInput
            class="dark:bg-transparent dark:border-gray-600"
            type="text"
            v-model="searchFilter"
            placeholder="Search"
          />
        </div>
        <div class="mt-4">
          <div
            v-for="student in filteredStudents"
            :key="student.id"
            class="flex py-2"
          >
            <AppCheckbox
              :id="student.fullName"
              :value="student.id"
              v-model="checkedNames"
              no-label
            />
            <label :for="student.fullName" class="ml-2"
              ><div class="inline-block text-gray-900 dark:text-white">
                {{ student.fullName }}
              </div>
            </label>
          </div>
        </div>
      </template>
      <template #action>
        <AppButton
          @click="handleSubmit"
          prominent
          :disabled="!checkedNames.length"
        >
          Add
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CourseWithExams, User } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'

export default defineComponent({
  name: 'AddStudentModal',
  components: { AppButton, AppInput, AppModal, AppCheckbox },
  props: {
    courseSlug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const modal = ref(false)

    const { setSnackbarMessage } = useSnackbar()

    const [students, fetchStudents, loadingStudents, errorStudents] = useFetch(
      () => usersService.getStudents(),
      []
    )

    const [course, fetchCourse, loadingCourse, errorCourse] =
      useFetch<CourseWithExams | null>(() =>
        coursesService.getCourse(props.courseSlug)
      )

    fetchStudents()

    fetchCourse()

    return {
      students,
      loadingStudents,
      errorStudents,
      course,
      loadingCourse,
      errorCourse,
      modal,
      setSnackbarMessage
    }
  },
  data() {
    return {
      checkedNames: [],
      searchFilter: ''
    }
  },
  computed: {
    unenrolledStudents(): User[] {
      const unenrolledStudents = (student: User): boolean => {
        return (
          !!this.course && !this.course.studentsEnrolled.includes(student.id)
        )
      }
      return this.students.filter(unenrolledStudents)
    },
    filteredStudents(): User[] {
      return this.unenrolledStudents.filter(student => {
        return student.fullName
          .toLowerCase()
          .includes(this.searchFilter.toLowerCase())
      })
    }
  },
  methods: {
    async handleSubmit() {
      if (this.course) {
        try {
          await coursesService.enrollUsers(this.checkedNames, this.course.id)
          this.setSnackbarMessage(
            'Students successfully added to course.',
            'success'
          )
        } catch (error) {
          this.setSnackbarMessage(error.response.data.error, 'error')
        } finally {
          this.modal = false
        }
      }
    }
  }
})
</script>
