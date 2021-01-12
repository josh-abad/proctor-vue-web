<template>
  <div>
    <div v-if="course.weeks" class="flex flex-col space-y-2">
      <Week
        :week="week"
        v-for="week in course.weeks"
        :key="week"
        :expanded="weekVisibility[week - 1]"
        @toggle-collapse="handleHide(week)"
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
  data () {
    return {
      weekVisibility: [] as boolean[]
    }
  },
  computed: {
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    }
  },
  created () {
    for (let i = 0; i < this.course.weeks; i++) {
      this.weekVisibility.push(true)
    }
  },
  methods: {
    handleHide (week: number): void {
      this.weekVisibility[week - 1] = !this.weekVisibility[week - 1]
    }
  }
})
</script>
