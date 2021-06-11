<template>
  <transition name="fade" mode="out-in">
    <div v-if="error">Error loading students</div>
    <List class="mt-4" v-else-if="loading">
      <li class="flex items-center py-3" v-for="i in 5" :key="i">
        <AppSkeleton class="rounded-full w-9 h-9" />
        <AppSkeleton class="w-32 h-3 ml-4" />
      </li>
    </List>
    <List class="mt-4" v-else-if="students.length">
      <StudentRow
        :student="student"
        :course-slug="courseSlug"
        v-for="student in students"
        :key="student.id"
        @delete-student="$emit('delete-student', student.id)"
      />
    </List>
    <div
      v-else
      class="flex items-center justify-center w-full py-5 text-gray-500"
    >
      <ExclamationCircleIcon class="w-5 h-5 fill-current" />
      <div class="ml-2 text-lg font-semibold">
        There are no students enrolled in this course.
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import StudentRow from './StudentRow.vue'
import AppSkeleton from './ui/AppSkeleton.vue'
import { User } from '@/types'
import List from './List.vue'

export default defineComponent({
  name: 'StudentList',
  components: { ExclamationCircleIcon, StudentRow, AppSkeleton, List },
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

    courseSlug: {
      type: String,
      required: false
    }
  },
  emits: ['delete-student']
})
</script>
