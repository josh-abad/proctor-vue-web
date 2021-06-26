<template>
  <nav
    class="
      relative
      flex
      text-gray-500
      bg-gray-100
      border-b border-gray-300
      rounded-t-lg
      shadow
      dark:bg-gray-800
      dark:border-gray-700
    "
  >
    <Tab :to="`/courses/${courseSlug}`"> Overview </Tab>
    <Tab :to="`/courses/${courseSlug}/students`"> Students </Tab>
    <Tab :to="`/courses/${courseSlug}/grades`"> Grades </Tab>
    <span
      class="
        absolute
        top-[6px]
        w-full
        h-[35px]
        duration-200
        border-b-2 border-green-500
      "
    ></span>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tab from './Tab.vue'

export default defineComponent({
  name: 'TabRow',
  components: { Tab },
  props: {
    courseSlug: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
span {
  transform-origin: 0 0;
}

a:first-child.active ~ span {
  transform: translateX(0) scaleX(0.333);
}

a:nth-child(2).active ~ span {
  transform: translateX(33.333%) scaleX(0.333);
}

a:nth-child(3).active ~ span {
  transform: translateX(calc(33.333% * 2)) scaleX(0.333);
}
</style>
