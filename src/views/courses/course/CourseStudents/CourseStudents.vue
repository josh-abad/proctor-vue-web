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
    <div
      v-if="students && students.length"
      class="flex flex-col mt-4 separator-y"
    >
      <StudentRow
        :student="student"
        :course-id="courseId"
        v-for="student in filteredStudents"
        :key="student?.id"
      />
    </div>
    <div
      v-else
      class="flex items-center justify-center w-full py-5 text-gray-500"
    >
      <ExclamationCircleIcon class="w-5 h-5 fill-current" />
      <div class="ml-2 text-lg font-semibold">
        There are no students enrolled in this course.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import AppInput from '@/components/ui/AppInput.vue'
import AddStudentModal from './components/AddStudentModal.vue'
import StudentRow from '@/components/StudentRow.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'

export default defineComponent({
  name: 'CourseStudents',
  components: { AppInput, AddStudentModal, StudentRow, ExclamationCircleIcon },
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

    return {
      students,
      loading,
      error
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
