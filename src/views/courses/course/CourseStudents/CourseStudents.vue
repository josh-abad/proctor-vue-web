<template>
  <div>
    <div class="flex items-start justify-between">
      <AppInput
        type="text"
        v-model="searchFilter"
        placeholder="Filter students"
      />
      <AddStudentModal
        v-if="$store.getters.permissions(['coordinator', 'admin'])"
        @new-students="fetchStudents"
        :enrolled-students="students"
        :course-slug="slug"
      />
    </div>
    <StudentList
      :students="filteredStudents"
      :loading="loading"
      :error="error"
      :course-slug="slug"
      @delete-student="handleDeleteStudent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import AppInput from '@/components/ui/AppInput.vue'
import AddStudentModal from './components/AddStudentModal.vue'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'
import StudentList from '@/components/StudentList.vue'

export default defineComponent({
  name: 'CourseStudents',
  components: {
    AppInput,
    AddStudentModal,
    StudentList
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchFilter: ''
    }
  },
  setup(props) {
    const [students, fetchStudents, loading, error] = useFetch(
      () => coursesService.getStudents(props.slug),
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
      fetchStudents,
      loading,
      error,
      handleDeleteStudent
    }
  },
  computed: {
    filteredStudents(): User[] {
      return this.students.filter(student => {
        return student?.fullName
          .toLowerCase()
          .includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
