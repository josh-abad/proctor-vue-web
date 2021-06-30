<template>
  <AppPanel class="py-4 px-4">
    <Subheading>
      <AppLabel emphasis>{{ name }}</AppLabel>
      <span
        class="px-2 text-xs font-semibold bg-gray-300 rounded dark:bg-gray-700"
        >{{ events.length }}</span
      >
    </Subheading>
    <FadeTransition>
      <div v-if="hasError"><ErrorLoading /></div>
      <List v-else-if="isLoading">
        <div class="py-3 last:pb-0" v-for="i in 3" :key="i">
          <AppSkeleton class="w-32 h-2" />
          <AppSkeleton class="my-1 w-40 h-3" />
        </div>
      </List>
      <div v-else>
        <div v-if="isEmpty" class="flex justify-center items-center py-5">
          <span class="text-gray-500">{{ emptyMessage }}</span>
        </div>
        <List v-else>
          <li v-for="(date, i) in eventsByDate" :key="i" class="py-3 last:pb-0">
            <div class="text-xs text-gray-600 dark:text-gray-400">
              {{
                date?.[0].startDate && date?.[0].endDate
                  ? `${isOpen ? 'Closes on' : 'Opens on'} ${getFormattedDate(
                      date?.[0]
                    )}`
                  : isOpen
                  ? 'Open indefinitely'
                  : 'Opens soon'
              }}
            </div>
            <ul class="space-y-1 w-full sm:w-64">
              <Item :event="event" v-for="event in date" :key="event.id" />
            </ul>
          </li>
        </List>
      </div>
    </FadeTransition>
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
import List from '../List.vue'
import Subheading from '../Subheading.vue'
import FadeTransition from '../transitions/FadeTransition.vue'

export default defineComponent({
  name: 'Timeline',
  components: {
    AppPanel,
    AppLabel,
    Item,
    ErrorLoading,
    AppSkeleton,
    List,
    Subheading,
    FadeTransition
  },
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
