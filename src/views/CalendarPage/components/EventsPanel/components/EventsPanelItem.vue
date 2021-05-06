<template>
  <div class="flex items-center">
    <LockClosedIcon class="w-5 h-5" />
    <div class="ml-2">
      <div class="text-gray-700 dark:text-gray-300">
        <router-link
          :to="`/courses/${event.course.id}/exams/${event.id}`"
          class="font-semibold text-gray-900 dark:text-white"
          >{{ event.label }}</router-link
        >
        opens
      </div>
      <router-link
        :to="`/courses/${event.course.id}`"
        class="block text-xs font-semibold tracking-wider text-gray-500 uppercase"
      >
        {{ event.course.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'
import { LockClosedIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'EventsPanelItem',
  components: { LockClosedIcon },
  props: {
    event: {
      type: Object as PropType<Exam>,
      required: true
    }
  }
})
</script>
