<template>
  <div class="flex justify-between items-center pt-3 mt-3">
    <div class="flex">
      <div class="rounded overflow-hidden w-40 h-20 shadow">
        <router-link :to="`/courses/${course.id}`">
          <img
            src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
            alt="Course image"
            class="w-full object-cover"
          />
        </router-link>
      </div>
      <div class="ml-3">
        <AppLabel emphasis>2023 Online Class</AppLabel>
        <router-link :to="`/courses/${course.id}`" class="font-semibold">
          {{ course.name }}
        </router-link>
      </div>
    </div>
    <div class="w-52">
      <ProgressBar :percentage="percentage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

export default defineComponent({
  name: 'CourseListItem',
  components: { ProgressBar, AppLabel },
  props: {
    course: {
      type: Object as () => Course,
      required: true
    }
  },
  computed: {
    percentage (): number {
      return this.$store.getters.courseCompletedPercentage(this.course.id, this.$store.state.user?.id)
    }
  }
})
</script>
