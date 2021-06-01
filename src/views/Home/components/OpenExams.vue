<template>
  <Timeline
    name="Open Exams"
    :events="openExams"
    empty-message="No open exams."
    :has-error="error"
    :is-loading="loading"
    is-open
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import usersService from '@/services/users'
import useFetch from '@/composables/use-fetch'
import { useStore } from '@/store'
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

    return {
      openExams,
      loading,
      error
    }
  }
})
</script>
