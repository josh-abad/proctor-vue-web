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
      <div v-if="error">Error</div>
      <div v-else-if="loading" class="mt-2 separator-y">
        <div class="flex items-center py-3" v-for="i in 5" :key="i">
          <AppSkeleton class="rounded-full w-9 h-9" />
          <div class="ml-4">
            <AppSkeleton class="w-32 h-3" />
            <AppSkeleton class="h-2 mt-2 w-28" />
          </div>
        </div>
      </div>
      <div v-else-if="students.length" class="mt-2 separator-y">
        <StudentRow
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          show-course-count
          @delete-student="handleDeleteStudent(student.id)"
        />
      </div>
      <div v-else>No students found</div>
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
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'StudentsPage',
  components: { AppInput, StudentRow, AppPanel, AppSkeleton },
  setup() {
    const [students, fetchStudents, loading, error] = useFetch(
      () => usersService.getStudents(),
      []
    )

    fetchStudents()

    const handleDeleteStudent = (id: string) => {
      students.value = students.value.filter(student => {
        return student.id !== id
      })
    }

    return {
      students,
      loading,
      error,
      handleDeleteStudent
    }
  },
  data() {
    return {
      searchFilter: ''
    }
  },
  computed: {
    filteredStudents(): User[] {
      return this.students.filter(student => {
        return student.fullName
          .toLowerCase()
          .includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
