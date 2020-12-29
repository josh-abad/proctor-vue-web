<template>
  <header
    class="flex h-20 sticky top-0 w-full items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200 z-20"
  >
    <div class="flex items-center">
      <button
        class="block focus:outline-none text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:border-transparent focus:ring-transparent"
        @click="$emit('toggle')"
      >
        <svg
          class="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <router-link to="/">
        <img
          :src="require(`@/assets/${logoFilename}`)"
          alt="Logo"
          class="ml-6 h-7"
          @click="$router.push('/')"
        />
      </router-link>
    </div>
    <div class="flex items-center">
      <div>
        <SearchBar />
      </div>
      <div class="hidden items-center sm:flex md:block">
        <NavBarUserDropdown />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Theme } from '@/types'
import { defineComponent } from 'vue'
import NavBarUserDropdown from './NavBarUserDropdown.vue'
import SearchBar from './SearchBar.vue'

export default defineComponent({
  components: { NavBarUserDropdown, SearchBar },
  emits: ['toggle'],
  props: {
    isOpen: Boolean
  },
  computed: {
    isLoggedIn (): boolean {
      return this.$store.getters.isLoggedIn
    },
    logoFilename (): string {
      const theme: Theme = this.$store.state.theme

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'logo-white.png'
      }
      return 'logo.png'
    }
  }
})
</script>
