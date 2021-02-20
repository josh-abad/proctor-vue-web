<template>
  <div class="p-4">
    <AppPanel v-if="students.length > 0">
      <div class="flex justify-between">
        <div class="text-2xl font-bold">Students</div>
        <AppInput
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
    </AppPanel>
    <div v-else>
      <div>No students found</div>
    </div>
  </div>
</template>

<script lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import StudentRow from '@/components/StudentRow.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentsPage',
  components: { AppInput, StudentRow, AppPanel },
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
