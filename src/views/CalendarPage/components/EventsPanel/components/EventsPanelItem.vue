<template>
  <li class="flex py-2">
    <LockClosedIcon v-if="status === 'close'" class="w-5 h-5 icon" />
    <LockOpenIcon v-else class="w-5 h-5 icon" />
    <span class="ml-2">
      <router-link :to="`/courses/${event.course.id}/${event.id}`">
        {{ event.label }}
      </router-link>
      in
      <router-link :to="`/courses/${event.course.id}`">
        {{ event.course.name }}
      </router-link>
      <span class="ml-1">{{
        status +
        (isBefore ? (status[status.length - 1] === 'e' ? 'd' : 'ed') : 's')
      }}</span>
    </span>
  </li>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import dayjs from 'dayjs'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'EventsPanelItem',
  components: { LockClosedIcon, LockOpenIcon },
  props: {
    date: {
      type: String,
      required: true
    },
    event: {
      type: Object as PropType<Exam>,
      required: true
    }
  },
  computed: {
    status(): 'open' | 'close' {
      return this.date === dayjs(this.event.startDate).format('YYYY-MM-DD')
        ? 'open'
        : 'close'
    },

    isBefore(): boolean {
      return dayjs(this.date).isBefore(new Date())
    }
  }
})
</script>

<style lang="postcss" scoped>
span,
.icon {
  @apply text-gray-900 dark:text-white;
}

a {
  @apply text-indigo-700 dark:text-indigo-300 hover:underline;
}
</style>
