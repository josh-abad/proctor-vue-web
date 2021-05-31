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
import { computed, defineComponent } from 'vue'
import usersService from '@/services/users'
import useFetch from '@/composables/use-fetch'
import { useStore } from '@/store'
import { Exam } from '@/types'
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

    const eventsByDate = computed(() => {
      const map = new Map(
        Array.from(upcomingExams.value, event => [
          event.startDate,
          [] as Exam[]
        ])
      )
      upcomingExams.value.forEach(event =>
        map.get(event.startDate)?.push(event)
      )
      return Array.from(map.values())
    })

    return {
      upcomingExams: eventsByDate,
      loading,
      error
    }
  }
})
</script>
