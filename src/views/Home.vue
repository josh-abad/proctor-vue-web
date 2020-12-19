<template>
  <div class="home dark:text-gray-200 text-xl">
    <p v-if="user">
      Home page
      <BaseButton @click="$store.dispatch('alert', 'This is a snackbar')" label="Show snackbar" />
      <BaseButton @click="$store.commit('displayDialog', {
        header: 'Test',
        actionLabel: 'Confirm',
        message: 'This is a test'
      })" label="Show dialog" />
    </p>
    <p v-else>you are not logged in smh</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  name: 'Home',
  computed: {
    user (): User {
      return this.$store.state.user
    }
  }
})
</script>
