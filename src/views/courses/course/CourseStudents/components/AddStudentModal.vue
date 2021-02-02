<template>
  <BaseButton id="btn-open" @click="isOpen = true">Add Student</BaseButton>
  <teleport to="#modals">
    <AppModal :open="isOpen" @close="isOpen = false">
      <template #header>Choose Students</template>
      <template #body>
        <div class="mt-4">
          <BaseInput type="text" v-model="searchFilter" placeholder="Search" />
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
        <BaseButton
          @click="handleSubmit"
          prominent
          :disabled="!checkedNames.length"
        >
          Add
        </BaseButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Course, User } from '@/types'
import BaseButton from '@/components/BaseButton.vue'
import { ENROLL_STUDENTS } from '@/store/action-types'
import BaseInput from '@/components/BaseInput.vue'
import AppModal from '@/components/AppModal.vue'

export default defineComponent({
  name: 'AddStudentModal',
  components: { BaseButton, BaseInput, AppModal },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  emits: ['close-modal'],
  data () {
    return {
      checkedNames: [],
      searchFilter: '',
      isOpen: false
    }
  },
  computed: {
    course (): Course | undefined {
      return this.$store.getters.courseByID(this.courseId)
    },
    students (): User[] {
      return this.$store.getters.students
    },
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
    async handleSubmit (): Promise<void> {
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
