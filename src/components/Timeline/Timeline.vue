<template>
  <AppPanel>
    <AppLabel class="pb-2 label-border" emphasis>{{ name }}</AppLabel>
    <div v-if="hasError"><ErrorLoading /></div>
    <div v-else-if="isLoading" class="mt-4 space-y-2">
      <SkeletonItem v-for="i in 5" :key="i" />
    </div>
    <div v-else class="mt-4 space-y-2">
      <div v-if="isEmpty" class="flex items-center justify-center py-5">
        <span class="text-gray-500">{{ emptyMessage }}</span>
      </div>
      <div v-else>
        <div v-for="(date, i) in events" :key="i">
          <div class="item__date">{{ getFormattedDate(date?.[0]) }}</div>
          <div class="w-full sm:w-64">
            <Item
              :event="event"
              v-for="event in date"
              :key="event.id"
              :isOpen="isOpen"
            />
          </div>
        </div>
      </div>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import { Exam } from '@/types'
import dayjs from 'dayjs'
import SkeletonItem from './components/SkeletonItem.vue'
import Item from './components/Item.vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'

export default defineComponent({
  name: 'Timeline',
  components: { AppPanel, AppLabel, SkeletonItem, Item, ErrorLoading },
  props: {
    name: {
      type: String,
      required: true
    },

    events: {
      type: Array as PropType<Exam[][]>,
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
            'dddd, DD MMMM YYYY'
          )
        : ''
    }

    const isEmpty = computed(() => {
      return props.events.every(date => date.length === 0)
    })

    return {
      getFormattedDate,
      isEmpty
    }
  }
})
</script>

<style lang="postcss" scoped>
.item__date {
  @apply dark:text-gray-400 text-sm;
}
</style>
