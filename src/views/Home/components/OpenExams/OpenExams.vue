<template>
  <AppPanel>
    <AppLabel class="pb-2 label-border" emphasis>Open Exams</AppLabel>
    <div v-if="error"><ErrorLoading /></div>
    <div v-else-if="loading" class="mt-4 space-y-2">
      <SkeletonItem v-for="i in 5" :key="i" />
    </div>
    <div v-else class="mt-4 space-y-2">
      <div v-if="isEmpty" class="flex items-center justify-center py-5">
        <span class="text-gray-500">No open exams.</span>
      </div>
      <div v-else>
        <div v-for="(events, i) in openExams" :key="i">
          <div class="item__date">{{ getFormattedDate(events?.[0]) }}</div>
          <div class="w-full sm:w-64">
            <Item
              :event="examEvent"
              v-for="examEvent in events"
              :key="examEvent.id"
            />
          </div>
        </div>
      </div>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import usersService from '@/services/users'
import useFetch from '@/composables/use-fetch'
import { useStore } from '@/store'
import { Exam } from '@/types'
import dayjs from 'dayjs'
import SkeletonItem from './components/SkeletonItem.vue'
import Item from './components/Item.vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'

export default defineComponent({
  name: 'OpenExams',
  components: { AppPanel, AppLabel, SkeletonItem, Item, ErrorLoading },
  setup () {
    const store = useStore()

    const [
      openExams,
      fetchOpenExams,
      loading,
      error
    ] = useFetch(() => usersService.getOpenExams(store.state.user?.id ?? ''), [])

    fetchOpenExams().then(() => {
      openExams.value = openExams.value.slice(0, 5)
    })

    const eventsByDate = computed(() => {
      const map = new Map(Array.from(openExams.value, event => [event.endDate, [] as Exam[]]))
      openExams.value.forEach(event => map.get(event.endDate)?.push(event))
      return Array.from(map.values())
    })

    const getFormattedDate = (event?: Exam) => {
      return event ? dayjs(event.endDate).format('dddd, DD MMMM YYYY') : ''
    }

    const isEmpty = computed(() => {
      return openExams.value.length === 0
    })

    return {
      openExams: eventsByDate,
      getFormattedDate,
      isEmpty,
      loading,
      error
    }
  }
})
</script>

<style lang="postcss" scoped>
.item__date {
  @apply dark:text-gray-400 text-sm;
}
</style>
