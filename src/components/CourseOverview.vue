<template>
  <div>
    <div v-if="course.weeks" class="flex flex-col space-y-2">
      <Week
        :week="week"
        :exams="exams.filter((exam) => exam.week === week)"
        v-for="week in course.weeks"
        :key="week"
        :expanded="weekVisibility[week - 1]"
        @toggle-collapse="handleHide(week)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Course, Exam } from '@/types'
import { defineComponent } from 'vue'
import Week from './Week.vue'

export default defineComponent({
  components: { Week },
  name: 'CourseOverview',
  data () {
    return {
      weekVisibility: [] as boolean[]
    }
  },
  mounted () {
    for (let i = 0; i < this.course.weeks; i++) {
      this.weekVisibility.push(true)
    }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  methods: {
    handleHide (week: number): void {
      this.weekVisibility[week - 1] = !this.weekVisibility[week - 1]
    }
  },
  computed: {
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    exams (): Exam[] {
      return this.$store.getters.getExamsByCourse(this.courseId)
    }
  }
})
</script>
