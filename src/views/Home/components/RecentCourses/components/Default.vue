<template>
  <!-- <div class="flex justify-start mt-4 space-x-4 duration-300 ease-in-out"> -->
  <div class="course-list--card-view">
    <CoursesPageCard
      class="flex-none card"
      :course="course"
      :key="course.id"
      v-for="course in recentCourses"
      :style="`transform: translateX(${position})`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CoursesPageCard from '@/components/CoursesPageCard.vue'
import usersService from '@/services/users'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Default',
  components: { CoursesPageCard },
  props: {
    current: {
      type: Number,
      required: true
    },

    userId: {
      type: String,
      required: true
    }
  },
  emits: ['load-value'],
  async setup (props) {
    const store = useStore()

    const recentCourses = ref(await usersService.getRecentCourses(props.userId))
    recentCourses.value.reverse()

    if (store.state.user) {
      store.state.user.recentCourses = recentCourses.value.map(course => course.id)
    }

    /**
     * HACK: odd numbered items do not render correctly.
     * Fix the CSS so the length does not matter.
     */
    if (recentCourses.value.length % 2 !== 0) {
      recentCourses.value.pop()
    }

    return {
      recentCourses
    }
  },
  computed: {
    position (): string {
      return `calc(-${this.current * 100}% - ${1 * this.current}rem)`
    }
  },
  mounted () {
    this.$emit('load-value', this.recentCourses.length)
  }
})
</script>

<style lang="postcss" scoped>
/* TODO: make it scrollable */
.course-list--card-view {
  @apply mt-4 flex space-x-4 overflow-x-hidden sm:px-2 pb-5 sm:-mx-2 -mb-5 sm:justify-center;
  scroll-snap-type: x mandatory;
}

.card {
  @apply carousel-1 sm:carousel-2;
  scroll-snap-align: start;
}
</style>
