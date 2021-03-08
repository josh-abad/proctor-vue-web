<template>
  <div class="mt-4 space-y-2">
    <div v-if="upcomingExams.length">
      <div v-for="(events, i) in eventsByDate" :key="i">
        <div class="item__date">{{ formattedDate(events?.[0]) }}</div>
        <div class="w-full sm:w-64">
          <Item :event="examEvent" v-for="(examEvent, i) in events" :key="i" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-5">
      <span class="text-gray-500">No upcoming events.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent, ref } from 'vue'
import Item from './Item.vue'
import dayjs from 'dayjs'
import usersService from '@/services/users'

export default defineComponent({
  name: 'Items',
  components: { Item },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  async setup (props) {
    const upcomingExams = ref(await usersService.getUpcomingExams(props.userId))

    return {
      upcomingExams
    }
  },
  computed: {
    eventsByDate (): AppEvent[][] {
      const map = new Map(Array.from(this.upcomingExams, event => [event.date, [] as AppEvent[]]))
      this.upcomingExams.forEach(event => map.get(event.date)?.push(event))
      return Array.from(map.values())
    }
  },
  methods: {
    formattedDate (event?: AppEvent): string {
      return event ? dayjs(event.date).format('dddd, DD MMMM YYYY') : ''
    }
  }
})
</script>

<style lang="postcss" scoped>
.item__date {
  @apply dark:text-gray-400 text-sm;
}
</style>
