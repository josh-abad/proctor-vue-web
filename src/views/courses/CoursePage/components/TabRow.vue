<template>
  <div class="tab-row label-border">
    <router-link :to="`/courses/${courseId}`" class="tab-row__tab">
      Overview
    </router-link>
    <router-link :to="`/courses/${courseId}/students`" class="tab-row__tab">
      Students
    </router-link>
    <router-link :to="`/courses/${courseId}/grades`" class="tab-row__tab">
      Grades
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabRow',
  props: {
    courseId: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
.tab-row {
  @apply flex space-x-2 text-gray-500 bg-gray-100 rounded-t-lg shadow dark:bg-gray-800;
}

.tab-row__tab {
  @apply px-6 py-2 text-center hover:text-gray-900 dark:hover:text-white transition-colors ease-in-out duration-300;
}

.router-link-active {
  @apply rounded-t-lg font-semibold text-gray-900 dark:text-white border-b-2 border-green-500;
}
</style>
