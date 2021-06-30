<template>
  <li
    class="
      flex
      items-start
      space-x-1
      w-full
      text-sm text-gray-700
      dark:text-gray-300
    "
  >
    <div>
      <router-link
        :to="`/courses/${event.course.slug}/${event.slug}`"
        class="
          font-semibold
          text-indigo-700
          dark:text-indigo-300
          hover:underline
        "
      >
        {{ event.label }}
      </router-link>
      in
      <router-link
        :to="`/courses/${event.course.slug}`"
        class="
          font-semibold
          text-indigo-700
          dark:text-indigo-300
          hover:underline
        "
      >
        {{ event.course.name }}
      </router-link>
    </div>
  </li>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Item',
  props: {
    event: {
      type: Object as PropType<Exam>,
      required: true
    }
  }
})
</script>
