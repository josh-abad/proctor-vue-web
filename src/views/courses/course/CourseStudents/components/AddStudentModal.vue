<template>
  <AppButton id="btn-open" @click="modal.open">Add Student</AppButton>
  <teleport to="#modals">
    <AppModal :open="modal.isOpen" @close="modal.close">
      <template #header>Choose Students</template>
      <template #body>
        <div class="mt-4">
          <AppInput type="text" v-model="searchFilter" placeholder="Search" />
        </div>
        <div class="mt-4">
          <div
            v-for="student in filteredStudents"
            :key="student.id"
            class="py-2"
          >
            <input
              type="checkbox"
              :id="student.fullName"
              :value="student.id"
              v-model="checkedNames"
            />
            <label :for="student.fullName" class="ml-2"
              ><div class="inline-block">
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
import { defineComponent } from 'vue'
import { Course, User } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import { ENROLL_STUDENTS } from '@/store/action-types'
import AppInput from '@/components/ui/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'
import coursesService from '@/services/courses'
import useModal from '@/composables/use-modal'

export default defineComponent({
  name: 'AddStudentModal',
  components: { AppButton, AppInput, AppModal },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  emits: ['close-modal'],
  setup (props) {
    const modal = useModal()

    const [
      students,
      fetchStudents,
      loadingStudents,
      errorStudents
    ] = useFetch(() => usersService.getStudents(), [])

    const [
      course,
      fetchCourse,
      loadingCourse,
      errorCourse
    ] = useFetch<Course | null>(() => coursesService.getCourse(props.courseId))

    fetchStudents()

    fetchCourse()

    return {
      students,
      loadingStudents,
      errorStudents,
      course,
      loadingCourse,
      errorCourse,
      modal
    }
  },
  data () {
    return {
      checkedNames: [],
      searchFilter: ''
    }
  },
  computed: {
    unenrolledStudents (): User[] {
      const unenrolledStudents = (student: User): boolean => {
        return !!this.course && !this.course.studentsEnrolled.includes(student.id)
      }
      return this.students.filter(unenrolledStudents)
    },
    filteredStudents (): User[] {
      return this.unenrolledStudents.filter(student => {
        return student.fullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  },
  methods: {
    async handleSubmit () {
      const payload = {
        userIds: this.checkedNames,
        courseId: this.courseId
      }
      await this.$store.dispatch(ENROLL_STUDENTS, payload)
      this.$emit('close-modal')
    }
  }
})
</script>
