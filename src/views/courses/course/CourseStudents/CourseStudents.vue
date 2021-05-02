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
      class="flex flex-col mt-4 space-y-4"
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
      class="flex items-center justify-center w-full py-5 font-semibold text-gray-500"
    >
      <ExclamationCircleIcon class="w-5 h-5 fill-current" />
      <div class="ml-2 text-lg">
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

export default defineComponent({
  name: 'CourseStudents',
  components: { AppInput, AddStudentModal, StudentRow, ExclamationCircleIcon },
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
    students (): (User | undefined)[] {
      return this.$store.getters.studentsByCourse(this.courseId)
    },
    filteredStudents (): (User | undefined)[] {
      return this.students.filter(student => {
        return student?.fullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
