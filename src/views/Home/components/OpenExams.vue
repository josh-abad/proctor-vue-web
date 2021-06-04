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
import userService from '@/services/user'
import useFetch from '@/composables/use-fetch'
import Timeline from '@/components/Timeline/Timeline.vue'

export default defineComponent({
  name: 'OpenExams',
  components: {
    Timeline
  },
  setup() {
    const [openExams, fetchOpenExams, loading, error] = useFetch(
      () => userService.getOpenExams(),
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
