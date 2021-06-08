<template>
  <li class="item">
    <div>
      <router-link
        :to="`/courses/${event.course.id}/exams/${event.id}`"
        class="item__course"
      >
        {{ event.label }}
      </router-link>
      in
      <router-link :to="`/courses/${event.course.id}`" class="item__location">
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

<style lang="postcss" scoped>
.item {
  @apply py-1 text-gray-700 dark:text-gray-300 text-sm flex items-start space-x-1 w-full;
}

.item__course {
  @apply inline font-semibold;
}

.item__action {
  @apply ml-1;
}

.item__action--opening {
  @apply text-green-800 dark:text-green-200;
}

.item__action--closing {
  @apply text-red-800 dark:text-red-200;
}

.item__location {
  @apply text-sm font-semibold;
}

a {
  @apply text-indigo-700 dark:text-indigo-300 hover:underline;
}
</style>
