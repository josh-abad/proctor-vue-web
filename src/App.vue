<template>
  <div class="min-h-screen antialiased text-gray-900 dark:text-white">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SET_USER } from '@/store/mutation-types'
import { AuthenticatedUser } from '@/types'
import authService from '@/services/auth'
import cookie from '@/utils/cookie'
import useTheme from '@/composables/use-theme'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    const { initTheme } = useTheme()
    initTheme()

    const loggedUserJSON = cookie.get('loggedAppUser')
    if (loggedUserJSON) {
      cookie.set('loggedAppUser', loggedUserJSON)
      const user: AuthenticatedUser = JSON.parse(loggedUserJSON)
      store.commit(SET_USER, user)
      authService.setToken(user.token)
    }
  }
})
</script>
