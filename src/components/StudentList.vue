<template>
  <div v-if="error">Error loading students</div>
  <div v-else-if="loading" class="mt-4 separator-y">
    <div class="flex items-center py-3" v-for="i in 5" :key="i">
      <AppSkeleton class="rounded-full w-9 h-9" />
      <AppSkeleton class="w-32 h-3 ml-4" />
    </div>
  </div>
  <div v-else-if="students.length" class="mt-4 separator-y">
    <StudentRow
      :student="student"
      :course-id="courseId"
      v-for="student in students"
      :key="student.id"
      @delete-student="$emit('delete-student', student.id)"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import StudentRow from './StudentRow.vue'
import AppSkeleton from './ui/AppSkeleton.vue'
import { User } from '@/types'

export default defineComponent({
  name: 'StudentList',
  components: { ExclamationCircleIcon, StudentRow, AppSkeleton },
  props: {
    students: {
      type: Array as PropType<User[]>,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    error: {
      type: Boolean,
      default: false
    },

    courseId: {
      type: String,
      required: false
    }
  },
  emits: ['delete-student']
})
</script>
