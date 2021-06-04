<template>
  <Timeline
    name="Upcoming Exams"
    :events="upcomingExams"
    empty-message="No upcoming exams."
    :has-error="error"
    :is-loading="loading"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userService from '@/services/user'
import useFetch from '@/composables/use-fetch'
import Timeline from '@/components/Timeline/Timeline.vue'

export default defineComponent({
  name: 'UpcomingExams',
  components: {
    Timeline
  },
  setup() {
    const [upcomingExams, fetchUpcomingExams, loading, error] = useFetch(
      () => userService.getUpcomingExams(),
      []
    )

    fetchUpcomingExams().then(() => {
      upcomingExams.value = upcomingExams.value.slice(0, 5)
    })

    return {
      upcomingExams,
      loading,
      error
    }
  }
})
</script>
