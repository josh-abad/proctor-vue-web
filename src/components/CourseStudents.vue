<template>
  <div class="mt-4">
    <BaseInput
      type="text"
      v-model="searchFilter"
      placeholder="Filter students"
    />
    <div class="font-semibold text-lg mt-4">
      <div v-if="searchFilter">Search for "{{ searchFilter }}"</div>
      <div v-else>Students Enrolled in Course</div>
    </div>
    <div v-if="students" class="divide-y divide-gray-300 dark:divide-gray-700">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="flex items-center py-4"
      >
        <img
          src="../assets/default-avatar.png"
          alt="Avatar"
          class="ml-2 w-8 h-8 object-cover rounded-full"
        />
        <div class="ml-4">
          <div>{{ student.name.first }} {{ student.name.last }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            @{{ student.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import BaseInput from './BaseInput.vue'

export default defineComponent({
  components: { BaseInput },
  name: 'CourseStudents',
  data () {
    return {
      searchFilter: ''
    }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    students (): User[] {
      return this.$store.getters.studentsByCourse(this.courseId)
    },
    alphabeticalStudents (): User[] {
      const alphabetical = (a: User, b: User) => {
        if (a.name.last < b.name.last) {
          return -1
        } else if (a.name.last > b.name.last) {
          return 1
        }
        return 0
      }
      return [...this.students].sort(alphabetical)
    },
    filteredStudents (): User[] {
      return this.alphabeticalStudents.filter(student => {
        const { first, last } = student.name
        return `${first} ${last}`.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
