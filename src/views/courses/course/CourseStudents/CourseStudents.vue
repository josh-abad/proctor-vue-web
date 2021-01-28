<template>
  <div>
    <div class="flex justify-between items-start">
      <BaseInput
        type="text"
        v-model="searchFilter"
        placeholder="Filter students"
      />
      <AddStudentModal :course-id="courseId" />
    </div>
    <div class="font-semibold text-lg mt-2">
      <div v-if="searchFilter">Search for "{{ searchFilter }}"</div>
      <div v-else>Students</div>
    </div>
    <div
      v-if="students && students.length"
      class="mt-4 flex flex-col space-y-4"
    >
      <StudentRow
        :student="student"
        v-for="student in filteredStudents"
        :key="student.id"
      />
    </div>
    <div
      v-else
      class="flex items-center justify-center w-full py-5 font-semibold text-gray-500"
    >
      <!-- Heroicons name: exclamation-circle -->
      <svg class="fill-current w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="ml-2 text-lg">
        There are no students enrolled in this course.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import BaseInput from '@/components/BaseInput.vue'
import AddStudentModal from './components/AddStudentModal.vue'
import StudentRow from '@/components/StudentRow.vue'

export default defineComponent({
  name: 'CourseStudents',
  components: { BaseInput, AddStudentModal, StudentRow },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchFilter: ''
    }
  },
  computed: {
    students (): User[] {
      return this.$store.getters.studentsByCourse(this.courseId)
    },
    filteredStudents (): User[] {
      return this.students.filter(student => {
        return student.fullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
