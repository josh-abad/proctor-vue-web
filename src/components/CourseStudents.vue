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
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="flex items-center py-4"
      >
        <img
          src="../assets/default-avatar.png"
          alt="Avatar"
          class="ml-2 w-8 h-8 object-cover rounded-full"
        />
        <div class="ml-4">
          <div>{{ student.name.first }} {{ student.name.last }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            @{{ student.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import BaseInput from './BaseInput.vue'
import AddStudentModal from './AddStudentModal.vue'

export default defineComponent({
  components: { BaseInput, AddStudentModal },
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
    alphabeticalStudents (): User[] {
      const alphabetical = (a: User, b: User) => {
        if (a.name.last < b.name.last) {
          return -1
        } else if (a.name.last > b.name.last) {
          return 1
        }
        return 0
      }
      return [...this.students].sort(alphabetical)
    },
    filteredStudents (): User[] {
      return this.alphabeticalStudents.filter(student => {
        const { first, last } = student.name
        return `${first} ${last}`.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
