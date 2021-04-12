<template>
  <div class="pt-3 mt-3">
    <div class="flex">
      <div class="w-16 h-16 overflow-hidden rounded shadow sm:w-40 sm:h-20">
        <router-link :to="`/courses/${course.id}`">
          <img
            src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
            alt="Course image"
            class="object-cover h-full sm:w-full"
          />
        </router-link>
      </div>
      <div class="ml-3 sm:flex sm:justify-between sm:w-full">
        <div>
          <router-link :to="`/courses/${course.id}`" class="font-semibold">
            {{ course.name }}
          </router-link>
        </div>
        <div class="flex items-center mt-2 w-52 sm:mt-0">
          <ProgressBar class="w-full" :percentage="percentage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

export default defineComponent({
  name: 'CourseListItem',
  components: { ProgressBar },
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
