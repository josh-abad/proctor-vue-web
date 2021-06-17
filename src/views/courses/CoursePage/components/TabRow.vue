<template>
  <div class="relative tab-row">
    <router-link :to="`/courses/${courseSlug}`" class="tab-row__tab">
      Overview
    </router-link>
    <router-link :to="`/courses/${courseSlug}/students`" class="tab-row__tab">
      Students
    </router-link>
    <router-link :to="`/courses/${courseSlug}/grades`" class="tab-row__tab">
      Grades
    </router-link>
    <span class="border-b-2 border-green-500 tab-item-animate"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabRow',
  props: {
    courseSlug: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
.tab-row {
  @apply flex text-gray-500 bg-gray-100 rounded-t-lg shadow dark:bg-gray-800;
  @apply border-b border-gray-300 dark:border-gray-700;
}

.tab-row__tab {
  @apply py-2 text-center hover:text-gray-900 dark:hover:text-white w-full;
}

.tab-item-animate {
  position: absolute;
  top: 6px;
  width: 100%;
  height: 35px;
  transform-origin: 0 0;
  transition: transform 0.25s;
}

.tab-row .tab-row__tab:first-child.router-link-active ~ .tab-item-animate {
  transform: translateX(0) scaleX(0.333);
}

.tab-row .tab-row__tab:nth-child(2).router-link-active ~ .tab-item-animate {
  transform: translateX(33.333%) scaleX(0.333);
}

.tab-row .tab-row__tab:nth-child(3).router-link-active ~ .tab-item-animate {
  transform: translateX(calc(33.333% * 2)) scaleX(0.333);
}

.router-link-active {
  @apply font-semibold text-gray-900 dark:text-white;
}
</style>
