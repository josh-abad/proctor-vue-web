<template>
  <li class="flex pt-3 mt-3">
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
  </li>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent, PropType, ref } from 'vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import coursesService from '@/services/courses'
import { useStore } from '@/store'

export default defineComponent({
  name: 'CourseListItem',
  components: { ProgressBar },
  props: {
    course: {
      type: Object as PropType<Course>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const coursePercentage = ref(0)
    const fetchCourseProgress = async () => { 
      if (!store.state.user) {
        return
      }
      const { percentage } = await coursesService.getCourseProgressByUser(props.course.id, store.state.user.id)
      coursePercentage.value = percentage
    }

    fetchCourseProgress()

    return {
      percentage: coursePercentage
    }
  }
})
</script>
