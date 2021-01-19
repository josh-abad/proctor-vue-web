<template>
  <div v-if="students.length > 0">
    <div class="p-6">
      <div class="flex justify-between">
        <div class="text-2xl font-bold">Students</div>
        <BaseInput
          type="text"
          v-model="searchFilter"
          placeholder="Search student"
        />
      </div>
      <div class="divide-y divide-gray-700">
        <StudentRow
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          show-course-count
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div>No students found</div>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import StudentRow from '@/components/StudentRow.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentsPage',
  components: { BaseInput, StudentRow },
  data () {
    return {
      searchFilter: ''
    }
  },
  computed: {
    students (): User[] {
      return this.$store.getters.students
    },
    filteredStudents (): User[] {
      return this.students.filter(student => {
        return student.fullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
