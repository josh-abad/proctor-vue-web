<template>
  <div class="p-4">
    <BasePanel v-if="students.length > 0">
      <div class="flex justify-between">
        <div class="text-2xl font-bold">Students</div>
        <BaseInput
          type="text"
          v-model="searchFilter"
          placeholder="Search student"
        />
      </div>
      <div class="mt-4 flex flex-col space-y-4">
        <StudentRow
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          show-course-count
        />
      </div>
    </BasePanel>
    <div v-else>
      <div>No students found</div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import BasePanel from '@/components/BasePanel.vue'
import StudentRow from '@/components/StudentRow.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentsPage',
  components: { BaseInput, StudentRow, BasePanel },
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
