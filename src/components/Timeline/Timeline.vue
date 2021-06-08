<template>
  <AppPanel>
    <header class="flex items-start justify-between label-border">
      <AppLabel emphasis>{{ name }}</AppLabel>
      <span>{{ events.length }}</span>
    </header>
    <transition name="fade" mode="out-in">
      <div v-if="hasError"><ErrorLoading /></div>
      <div v-else-if="isLoading" class="separator-y">
        <div class="py-3 last:pb-0" v-for="i in 3" :key="i">
          <AppSkeleton class="w-32 h-2" />
          <AppSkeleton class="w-40 h-3 my-1" />
        </div>
      </div>
      <div v-else>
        <div v-if="isEmpty" class="flex items-center justify-center py-5">
          <span class="text-gray-500">{{ emptyMessage }}</span>
        </div>
        <div v-else class="separator-y">
          <div
            v-for="(date, i) in eventsByDate"
            :key="i"
            class="py-3 last:pb-0"
          >
            <div class="item__date" v-if="!hideDate">
              {{ getFormattedDate(date?.[0]) }}
            </div>
            <ul class="w-full sm:w-64">
              <Item :event="event" v-for="event in date" :key="event.id" />
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </AppPanel>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import { Exam } from '@/types'
import dayjs from 'dayjs'
import Item from './components/Item.vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import AppSkeleton from '../ui/AppSkeleton.vue'

export default defineComponent({
  name: 'Timeline',
  components: { AppPanel, AppLabel, Item, ErrorLoading, AppSkeleton },
  props: {
    name: {
      type: String,
      required: true
    },

    events: {
      type: Array as PropType<Exam[]>,
      required: true
    },

    isOpen: {
      type: Boolean,
      default: false
    },

    emptyMessage: {
      type: String,
      default: 'No events to display.'
    },

    hasError: {
      type: Boolean,
      default: false
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    hideDate: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const getFormattedDate = (event?: Exam) => {
      return event
        ? dayjs(props.isOpen ? event.endDate : event.startDate).format(
            'dddd, D MMMM YYYY'
          )
        : ''
    }

    const isEmpty = computed(() => {
      return props.events.length === 0
    })

    const eventsByDate = computed(() => {
      const map = new Map(
        Array.from(props.events, event => [
          props.isOpen ? event.endDate : event.startDate,
          [] as Exam[]
        ])
      )
      props.events.forEach(event =>
        map.get(props.isOpen ? event.endDate : event.startDate)?.push(event)
      )
      return Array.from(map.values())
    })

    return {
      getFormattedDate,
      isEmpty,
      eventsByDate
    }
  }
})
</script>

<style lang="postcss" scoped>
.item__date {
  @apply text-gray-600 dark:text-gray-400 text-xs;
}

header span {
  @apply px-2 text-xs font-semibold bg-gray-300 dark:bg-gray-700 rounded;
}
</style>
