<template>
  <AppPanel class="py-4 px-4">
    <FadeTransition>
      <div v-if="isLoading">
        <AppSkeleton class="w-24 h-2" />
        <AppSkeleton class="mt-4 w-52 h-2" />
        <AppSkeleton class="mt-2 w-32 h-2" />
        <AppSkeleton class="mt-2 w-52 h-2" />
        <AppSkeleton class="mt-2 w-32 h-2" />
      </div>
      <div v-else-if="course">
        <AppLabel emphasis>About course</AppLabel>
        <p class="mt-2 text-sm">
          {{ course.description }}
        </p>
      </div>
    </FadeTransition>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import useCourse from '@/composables/use-course'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'CoursePageAbout',
  components: { AppLabel, AppPanel, FadeTransition, AppSkeleton },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { course, isLoading } = useCourse(props.slug)

    return {
      course,
      isLoading
    }
  }
})
</script>
