<template>
  <div class="p-4">
    <PageHeading>
      <template #label>Students</template>
    </PageHeading>
    <AppPanel class="mt-8">
      <div class="flex justify-between">
        <AppInput
          type="text"
          v-model="searchFilter"
          placeholder="Search student"
        />
      </div>
      <StudentList
        :students="filteredStudents"
        :loading="loading"
        :error="error"
        @delete-student="handleDeleteStudent"
      />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'
import StudentList from '@/components/StudentList.vue'
import PageHeading from '../../components/PageHeading.vue'
import NProgress from 'nprogress'

export default defineComponent({
  name: 'StudentsPage',
  components: { AppInput, AppPanel, StudentList, PageHeading },
  setup() {
    const [students, fetchStudents, loading, error] = useFetch(
      () => usersService.getStudents(),
      []
    )

    NProgress.start()
    fetchStudents().finally(NProgress.done)

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
