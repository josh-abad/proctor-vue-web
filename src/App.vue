<template>
  <div class="min-h-screen antialiased text-gray-900 dark:text-white">
    <div id="modals" />
    <div>
      <TheAppBar v-if="$store.state.user" @toggle="handleToggle" />
      <div>
        <TheSidebar v-if="$store.state.user" v-model:is-open="isOpen" />
        <div>
          <router-view
            class="duration-300 ease-in-out transform"
            :class="isOpen ? 'ml-auto sm:ml-56' : 'ml-0'"
          />
          <div class="mt-4">
            <Snackbar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Snackbar from './components/Snackbar.vue'
import TheAppBar from './components/TheAppBar/TheAppBar.vue'
import TheSidebar from './components/TheSidebar/TheSidebar.vue'
import { SUBMIT_EXAM } from './store/action-types'
import { SET_USER } from './store/mutation-types'
import { AuthenticatedUser, Submission } from './types'
import authService from '@/services/auth'
import cookie from '@/utils/cookie'
import useLocalStorage from '@/composables/use-local-storage'
import useTheme from '@/composables/use-theme'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    TheSidebar,
    Snackbar
  },
  setup() {
    const isOpen = useLocalStorage('sidebarState', false)

    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    const { initTheme } = useTheme()
    initTheme()

    return {
      isOpen,
      handleToggle
    }
  },
  async created() {
    await this.initUser()
  },
  methods: {
    async initUser() {
      const loggedUserJSON = cookie.get('loggedAppUser')
      if (loggedUserJSON) {
        cookie.set('loggedAppUser', loggedUserJSON)
        const user: AuthenticatedUser = JSON.parse(loggedUserJSON)
        this.$store.commit(SET_USER, user)
        authService.setToken(user.token)

        const pendingSubmissionsJSON = localStorage.getItem('pendingSubmission')
        if (pendingSubmissionsJSON) {
          const pendingSubmissions: Submission = JSON.parse(
            pendingSubmissionsJSON
          )
          await this.$store.dispatch(SUBMIT_EXAM, pendingSubmissions)
          localStorage.removeItem('pendingSubmission')
        }
      }
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
  @apply transition ease-out duration-100 transform;
}

.dropdown-fade-leave-active {
  @apply transition ease-in duration-75 transform;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  @apply opacity-0 scale-95;
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  @apply opacity-100 scale-100;
}

.modal-fade-enter-active {
  @apply transition ease-out duration-300 transform;
}

.modal-fade-leave-active {
  @apply transition ease-in duration-300 transform;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  @apply opacity-0 translate-y-4;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  @apply opacity-100 translate-y-0;
}

.separator-y {
  @apply divide-y divide-gray-300 dark:divide-gray-700;
}

.label-border {
  @apply border-b border-gray-300 dark:border-gray-700;
}
</style>
