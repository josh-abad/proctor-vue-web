<template>
  <!-- <div class="mt-4 flex justify-start space-x-4 ease-in-out duration-300"> -->
  <div class="course-list--card-view">
    <CoursesPageCard
      :course="course"
      :key="course.id"
      v-for="course in recentCourses.slice(start, start + 2)"
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
    start: {
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

    return {
      recentCourses
    }
  },
  mounted () {
    this.$emit('load-value', this.recentCourses.length)
  }
})
</script>

<style lang="postcss" scoped>
.course-list--card-view {
  @apply mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2;
}
</style>
