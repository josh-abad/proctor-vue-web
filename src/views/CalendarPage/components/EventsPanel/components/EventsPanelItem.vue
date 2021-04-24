<template>
  <div class="flex items-center">
    <LockOpenIcon class="w-5 h-5" v-if="event.action === 'opens'" />
    <LockClosedIcon class="w-5 h-5" v-else />
    <div class="ml-2">
      <div class="text-gray-700 dark:text-gray-300">
        <router-link
          :to="event.subjectUrl"
          class="font-semibold text-gray-900 dark:text-white"
          >{{ event.subject }}</router-link
        >
        {{ action }}
      </div>
      <router-link
        :to="event.locationUrl"
        class="block text-xs font-semibold tracking-wider text-gray-500 uppercase"
      >
        {{ event.location }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'
import { LockOpenIcon, LockClosedIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'EventsPanelItem',
  components: { LockOpenIcon, LockClosedIcon },
  props: {
    event: {
      type: Object as PropType<AppEvent>,
      required: true
    }
  },
  computed: {
    action (): string {
      const today = dayjs()
      if (dayjs(this.event.date).isAfter(today)) {
        return this.event.action
      }
      return this.event.action === 'opens' ? 'opened' : 'closed'
    }
  }
})
</script>
