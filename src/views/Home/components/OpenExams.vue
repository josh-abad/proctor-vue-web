<template>
  <Timeline
    name="Open Exams"
    :events="openExams"
    empty-message="No open exams."
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
  name: 'OpenExams',
  components: {
    Timeline
  },
  setup() {
    const store = useStore()

    const [openExams, fetchOpenExams, loading, error] = useFetch(
      () => usersService.getOpenExams(store.state.user?.id ?? ''),
      []
    )

    fetchOpenExams().then(() => {
      openExams.value = openExams.value.slice(0, 5)
    })

    const eventsByDate = computed(() => {
      const map = new Map(
        Array.from(openExams.value, event => [event.endDate, [] as Exam[]])
      )
      openExams.value.forEach(event => map.get(event.endDate)?.push(event))
      return Array.from(map.values())
    })

    return {
      openExams: eventsByDate,
      loading,
      error
    }
  }
})
</script>
