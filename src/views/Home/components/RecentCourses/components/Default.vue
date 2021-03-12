<template>
  <div class="flex mt-4 space-x-4 overflow-x-auto wrapper" id="recent-courses">
    <CoursesPageCard
      class="flex-none carousel-1 sm:carousel-2"
      :class="{ snap: i % 2 === 0 }"
      :course="course"
      :key="course.id"
      v-for="(course, i) in recentCourses"
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

    return {
      recentCourses
    }
  },
  mounted () {
    this.$emit('load-value', this.recentCourses.length)
  }
})
</script>

<style scoped>
.wrapper {
  scroll-snap-type: x mandatory;
}

.snap {
  scroll-snap-align: start;
}

::-webkit-scrollbar {
  display: none;
}
</style>
