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
        :course-id="courseId"
      />
    </div>
    <div class="mt-2 text-lg font-semibold">
      <div v-if="searchFilter">Search for "{{ searchFilter }}"</div>
      <div v-else>Students</div>
    </div>
    <StudentList
      :students="filteredStudents"
      :loading="loading"
      :error="error"
      :course-id="courseId"
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
    courseId: {
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
      () => coursesService.getStudents(props.courseId),
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
