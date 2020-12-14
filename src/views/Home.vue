<template>
  <div class="home dark:text-gray-200 text-xl">
    <p v-if="user">Home page</p>
    <p v-else>you are not logged in smh</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'

export default defineComponent({
  name: 'Home',
  computed: {
    user (): User {
      return this.$store.state.user
    }
  }
})
</script>
