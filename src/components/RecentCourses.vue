<template>
  <div v-show="recentCourses.length > 0">
    <BasePanel>
      <BaseLabel emphasis>Recent Courses</BaseLabel>
      <div class="grid grid-cols-3 gap-6 mt-3 sm:grid-cols-2 md:grid-cols-3">
        <div :key="course.id" v-for="course in recentCourses">
          <CourseCard :course="course" />
        </div>
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BasePanel from '@/components/BasePanel.vue'
import BaseLabel from '@/components/BaseLabel.vue'

export default defineComponent({
  components: { CourseCard, BasePanel, BaseLabel },
  name: 'RecentCourses',
  computed: {
    recentCourses (): Course[] {
      return this.$store.getters.getRecentCourses
    }
  }
})
</script>
