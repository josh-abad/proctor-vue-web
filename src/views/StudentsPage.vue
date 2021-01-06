<template>
  <div v-if="students.length > 0">
    <BasePanel>
      <label for="search">
        <BaseLabel emphasis>Search Student</BaseLabel>
      </label>
      <BaseInput id="search" type="text" v-model="searchFilter" />
      <div v-for="student in filteredStudents" :key="student.id" class="mb-2">
        {{ student.name.first }}
        {{ student.name.last }}
        <BaseButton @click="$router.push(`/students/${student.id}/enroll`)"
          >Enroll</BaseButton
        >
      </div>
    </BasePanel>
  </div>
  <div v-else>
    <div>No students found</div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseInput, BaseLabel, BasePanel, BaseButton },
  name: 'StudentsPage',
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
        const studentFullName = `${student.name.first} ${student.name.last}`
        return studentFullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
