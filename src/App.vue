<template>
  <div class="min-h-screen antialiased text-gray-900 dark:text-white">
    <div id="modals" />
    <router-view />
    <div>
      <Snackbar class="mt-10" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SET_USER } from '@/store/mutation-types'
import { AuthenticatedUser } from '@/types'
import authService from '@/services/auth'
import useTheme from '@/composables/use-theme'
import { useStore } from '@/store'
import Snackbar from './components/Snackbar.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const { initTheme } = useTheme()
    initTheme()
    const loggedUserJSON = localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user: AuthenticatedUser = JSON.parse(loggedUserJSON)
      store.commit(SET_USER, user)
      authService.setToken(user.token)
    }
  },
  components: { Snackbar }
})
</script>
