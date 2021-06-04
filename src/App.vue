<template>
  <div class="min-h-screen antialiased text-gray-900 dark:text-white">
    <div id="modals" />
    <div>
      <TheAppBar v-if="$store.state.user" @toggle="handleToggle" />
      <div>
        <NavigationDrawer v-if="$store.state.user" :is-open="isOpen">
          <NavigationItem href="/" @mobile-nav="isOpen = false">
            <template #label> Home </template>
            <template #icon>
              <HomeIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem href="/courses" @mobile-nav="isOpen = false">
            <template #label> Courses </template>
            <template #icon>
              <BookOpenIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem
            href="/students"
            v-if="$store.getters.permissions(['coordinator', 'admin'])"
            @mobile-nav="isOpen = false"
          >
            <template #label> Students </template>
            <template #icon>
              <UsersIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem href="/calendar" @mobile-nav="isOpen = false">
            <template #label> Calendar </template>
            <template #icon>
              <CalendarIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
        </NavigationDrawer>
        <div>
          <router-view
            class="duration-300 ease-in-out transform"
            :class="isOpen && $store.state.user ? 'ml-auto sm:ml-56' : 'ml-0'"
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
import NavigationDrawer from './components/NavigationDrawer.vue'
import { SET_USER } from './store/mutation-types'
import { AuthenticatedUser } from './types'
import authService from '@/services/auth'
import cookie from '@/utils/cookie'
import useLocalStorage from '@/composables/use-local-storage'
import useTheme from '@/composables/use-theme'
import NavigationItem from './components/NavigationItem.vue'
import {
  CalendarIcon,
  UsersIcon,
  BookOpenIcon,
  HomeIcon
} from '@heroicons/vue/solid'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    NavigationDrawer,
    Snackbar,
    NavigationItem,
    CalendarIcon,
    UsersIcon,
    BookOpenIcon,
    HomeIcon
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
