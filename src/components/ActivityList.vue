<template>
  <div v-if="hasError" class="flex justify-center pt-8 text-gray-500">
    Could not load activities
  </div>
  <div v-else-if="isLoading" class="separator-y">
    <div class="flex justify-between py-3" v-for="i in 5" :key="i">
      <AppSkeleton class="h-3" :class="i % 2 === 0 ? 'w-52' : 'w-60'" />
      <AppSkeleton class="h-3 w-14" />
    </div>
  </div>
  <ul v-else-if="activities.length" class="separator-y">
    <ActivityRow v-for="(event, i) of activities" :key="i" :event="event" />
  </ul>
  <div v-else class="flex justify-center py-8 text-gray-500">
    No activity to display.
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent, PropType } from '@vue/runtime-core'
import AppSkeleton from './ui/AppSkeleton.vue'
import ActivityRow from './ActivityRow.vue'

export default defineComponent({
  name: 'ActivityList',
  components: { AppSkeleton, ActivityRow },
  props: {
    activities: {
      type: Array as PropType<AppEvent[]>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    }
  }
})
</script>
