<template>
  <div>
    <div v-if="course" class="flex flex-col space-y-2">
      <Week
        v-for="week in course.weeks"
        :key="week"
        :courseId="courseId"
        :week="week"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import Week from '@/components/Week.vue'

export default defineComponent({
  name: 'CourseOverview',
  components: { Week },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    course (): Course | undefined {
      return this.$store.getters.courseByID(this.courseId)
    }
  }
})
</script>
