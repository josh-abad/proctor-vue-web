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

<style lang="postcss">
::-webkit-scrollbar {
  @apply w-3;
}

::-webkit-scrollbar-track {
  @apply bg-gray-200 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-700;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-600;
}

.dropdown-fade-enter-active {
  @apply transition duration-100 ease-out transform;
}

.dropdown-fade-leave-active {
  @apply transition duration-75 ease-in transform;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  @apply scale-95 opacity-0;
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  @apply scale-100 opacity-100;
}
</style>
