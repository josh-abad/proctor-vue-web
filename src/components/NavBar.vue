<template>
  <header
    class="flex h-20 sticky top-0 w-full items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 z-20"
  >
    <div class="flex items-center">
      <button
        class="block focus:outline-none text-gray-400 hover:text-green-500 dark:hover:text-gray-100 focus:border-transparent focus:ring-transparent"
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
      <div class="mr-5">
        <NavBarSearch />
      </div>
      <div class="hidden items-center sm:flex md:block">
        <NavBarUserDropdown />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBarUserDropdown from './NavBarUserDropdown.vue'
import NavBarSearch from './NavBarSearch.vue'
import logoMixin from '@/mixins/logo'

export default defineComponent({
  name: 'NavBar',
  components: { NavBarUserDropdown, NavBarSearch },
  mixins: [logoMixin],
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
