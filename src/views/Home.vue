<template>
  <div class="home dark:text-gray-200 text-xl">
    <div v-if="user">
      Home page
      <div class="mt-4">
        <RecentCourses />
      </div>
    </div>
    <div v-else>you are not logged in smh</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import RecentCourses from '@/components/RecentCourses.vue'

export default defineComponent({
  components: { RecentCourses },
  name: 'Home',
  computed: {
    user (): User {
      return this.$store.state.user
    }
  }
})
</script>
