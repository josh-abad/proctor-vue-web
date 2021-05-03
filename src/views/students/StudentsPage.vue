<template>
  <div class="p-4">
    <AppPanel>
      <div class="flex justify-between">
        <div class="text-2xl font-bold">Students</div>
        <AppInput
          type="text"
          v-model="searchFilter"
          placeholder="Search student"
        />
      </div>
      <div v-if="error">
        Error
      </div>
      <div v-else-if="loading">
        Loading...
      </div>
      <div v-else-if="students.length" class="flex flex-col mt-4 space-y-4">
        <StudentRow
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          show-course-count
        />
      </div>
      <div v-else>
        No students found
      </div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import StudentRow from '@/components/StudentRow.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'

export default defineComponent({
  name: 'StudentsPage',
  components: { AppInput, StudentRow, AppPanel },
  setup () {
    const [
      students,
      fetchStudents,
      loading,
      error
    ] = useFetch(() => usersService.getStudents(), [])

    fetchStudents()

    return {
      students,
      loading,
      error
    }
  },
  data () {
    return {
      searchFilter: ''
    }
  },
  computed: {
    filteredStudents (): User[] {
      return this.students.filter(student => {
        return student.fullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
