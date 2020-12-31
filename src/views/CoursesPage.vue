<template>
  <div>
    <BasePanel>
      <div class="text-2xl font-bold">Your Courses</div>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in alphabeticalCourses">
          <CourseCard :course="course" />
        </div>
      </div>
    </BasePanel>
    <div v-show="$store.getters.permissions('admin')" class="mt-3">
      <BaseButton @click="$router.push('/courses/new')"
        >Create New Course</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BasePanel from '@/components/BasePanel.vue'
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CourseCard, BaseButton, BasePanel },
  name: 'CoursesPage',
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    },
    alphabeticalCourses (): Course[] {
      const alphabetical = (a: Course, b: Course) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        }
        return 0
      }
      return [...this.courses].sort(alphabetical)
    }
  }
})
</script>
