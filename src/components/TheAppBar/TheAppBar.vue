<template>
  <header
    class="sticky top-0 z-20 flex items-center justify-between w-full h-20 py-4 bg-gray-100 bg-opacity-50 shadow-lg app-bar dark:bg-gray-800 dark:bg-opacity-75 app-bar__border"
  >
    <div class="flex items-center pl-6">
      <button
        class="block text-gray-500 focus:outline-none focus:ring-0"
        @click="$emit('toggle')"
      >
        <svg
          class="w-5 h-5 fill-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <router-link to="/">
        <AppLogo class="ml-6 h-7" @click="$router.push('/')" />
      </router-link>
    </div>
    <div class="flex items-center pr-6">
      <div class="hidden mr-5 sm:block">
        <Search />
      </div>
      <UserDropdown />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserDropdown from './components/UserDropdown.vue'
import Search from './components/Search/Search.vue'
import AppLogo from '../AppLogo.vue'

export default defineComponent({
  name: 'TheAppBar',
  components: { UserDropdown, Search, AppLogo },
  props: {
    isOpen: Boolean
  },
  emits: ['toggle'],
  computed: {
    isLoggedIn (): boolean {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>

<style lang="postcss" scoped>
/* Fix for backdrop-filter not working in nested elements (UserDropdown and Search, in this case) */
.app-bar::before {
  content: "";
  z-index: -1;
  @apply absolute w-full h-full backdrop-blur;
}

.app-bar__border {
  @apply border-b border-gray-800 border-opacity-10 dark:border-gray-100 dark:border-opacity-10;
}
</style>
