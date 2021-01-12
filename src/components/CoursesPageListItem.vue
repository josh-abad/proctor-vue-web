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
        <BaseLabel emphasis>2023 Online Class</BaseLabel>
        <router-link
          :to="`/courses/${course.id}`"
          class="text-lg font-semibold"
        >
          {{ course.name }}
        </router-link>
      </div>
    </div>
    <div class="w-60">
      <ProgressBar
        :percentage="
          $store.getters.courseCompletedPercentage(
            course.id,
            $store.state.user.id
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Course } from '@/types'
import { defineComponent } from 'vue'
import BaseLabel from './BaseLabel.vue'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
  name: 'CourseListItem',
  components: { ProgressBar, BaseLabel },
  props: {
    course: {
      type: Object as () => Course,
      required: true
    }
  }
})
</script>
