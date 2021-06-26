<template>
  <FadeTransition>
    <div v-if="error">Error loading students</div>
    <List class="mt-4" v-else-if="loading">
      <li class="flex items-center py-3" v-for="i in 5" :key="i">
        <AppSkeleton class="rounded-t-full rounded-b-full w-9 h-9" />
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
    <EmptyState v-else>
      <template #icon><UserGroupIcon /></template>
      <template #content> No students found. </template>
    </EmptyState>
  </FadeTransition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserGroupIcon } from '@heroicons/vue/outline'
import StudentRow from './StudentRow.vue'
import AppSkeleton from './ui/AppSkeleton.vue'
import { User } from '@/types'
import List from './List.vue'
import EmptyState from './EmptyState.vue'
import FadeTransition from './transitions/FadeTransition.vue'

export default defineComponent({
  name: 'StudentList',
  components: {
    UserGroupIcon,
    StudentRow,
    AppSkeleton,
    List,
    EmptyState,
    FadeTransition
  },
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
