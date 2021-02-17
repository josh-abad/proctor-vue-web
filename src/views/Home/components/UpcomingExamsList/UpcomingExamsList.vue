<template>
  <BasePanel v-if="upcomingExams.length">
    <BaseLabel class="pb-2 label-border" emphasis>Timeline</BaseLabel>
    <div class="mt-4 space-y-2">
      <div v-for="(events, i) in eventsByDate" :key="i">
        <div class="item__date">{{ formattedDate(events?.[0]) }}</div>
        <div class="w-64">
          <Item :event="examEvent" v-for="(examEvent, i) in events" :key="i" />
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import Item from './components/Item.vue'
import BasePanel from '@/components/BasePanel.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'UpcomingExams',
  components: { Item, BasePanel, BaseLabel },
  computed: {
    upcomingExams (): AppEvent[] {
      return this.$store.getters.upcomingExams.slice(0, 5)
    },
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
