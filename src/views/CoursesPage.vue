<template>
  <div>
    <BasePanel>
      <BaseLabel emphasis>{{ header }}</BaseLabel>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in courses">
          <CourseCard :course="course" />
        </div>
      </div>
    </BasePanel>
    <div v-show="userRole === 'admin'" class="mt-3">
      <BaseButton @click="$router.push('/courses/new')">Create New Course</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import CourseCard from '@/components/CourseCard.vue'
import { Course, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard, BaseButton, BasePanel, BaseLabel },
  name: 'CoursesPage',
  computed: {
    courses (): Course[] {
      return this.$store.getters.sortedCourses
    },
    header (): string {
      const userRole: Role = this.$store.getters.userRole
      if (userRole === 'student') {
        return 'Course overview'
      } else if (userRole === 'coordinator') {
        return 'Manage courses'
      }
      return 'All courses'
    },
    userRole (): Role {
      return this.$store.getters.userRole
    }
  }
})
</script>
