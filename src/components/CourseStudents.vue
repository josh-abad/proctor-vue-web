<template>
  <div class="mt-4">
    <div class="flex justify-between items-start">
      <BaseInput
        type="text"
        v-model="searchFilter"
        placeholder="Filter students"
      />
      <div>
        <button
          @click="addStudentModalOpen = true"
          class="flex flex-col items-center focus:outline-none"
        >
          <svg
            class="fill-current w-10 h-10 text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-full p-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
            />
          </svg>
          <span> Add </span>
        </button>
      </div>
      <teleport to="#modals">
        <AddStudentModal
          :courseId="courseId"
          v-show="addStudentModalOpen"
          @close-modal="addStudentModalOpen = false"
        />
      </teleport>
    </div>
    <div class="font-semibold text-lg mt-4">
      <div v-if="searchFilter">Search for "{{ searchFilter }}"</div>
      <div v-else>Students Enrolled in Course</div>
    </div>
    <div v-if="students" class="divide-y divide-gray-300 dark:divide-gray-700">
      <StudentRow
        :student="student"
        v-for="student in filteredStudents"
        :key="student.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import BaseInput from './BaseInput.vue'
import AddStudentModal from './AddStudentModal.vue'
import StudentRow from './StudentRow.vue'

export default defineComponent({
  components: { BaseInput, AddStudentModal, StudentRow },
  name: 'CourseStudents',
  data () {
    return {
      searchFilter: '',
      addStudentModalOpen: false
    }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    students (): User[] {
      return this.$store.getters.studentsByCourse(this.courseId)
    },
    filteredStudents (): User[] {
      return this.students.filter(student => {
        const { first, last } = student.name
        return `${first} ${last}`.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
