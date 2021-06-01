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
import usersService from '@/services/users'
import useFetch from '@/composables/use-fetch'
import { useStore } from '@/store'
import Timeline from '@/components/Timeline/Timeline.vue'

export default defineComponent({
  name: 'UpcomingExams',
  components: {
    Timeline
  },
  setup() {
    const store = useStore()

    const [upcomingExams, fetchUpcomingExams, loading, error] = useFetch(
      () => usersService.getUpcomingExams(store.state.user?.id ?? ''),
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
