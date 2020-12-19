<template>
  <div
    class="relative inline-block text-left"
    v-click-outside="{
      handler: handleClose,
      middleware: clickOutsideMiddleware
    }"
  >
    <div>
      <button
        @click.prevent="toggleDropdown"
        type="button"
        class="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-gray-700 dark:text-gray-200 focus:outline-none"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {{ userFirstName }}
        <img
          src="../assets/default-avatar.png"
          alt="Avatar"
          class="ml-2 w-6 h-6 object-cover rounded-full"
        />
        <svg
          id="dropdownToggle"
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- The dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      v-show="isOpen"
    >
      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >Account settings</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >Support</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            role="menuitem"
            >License</a
          >
          <button
            @click="handleLogOut"
            class="block w-full text-left px-4 py-2 text-sm border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBarUserDropdown',
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    userFirstName: String
  },
  methods: {
    toggleDropdown () {
      this.isOpen = !this.isOpen
    },
    handleLogOut () {
      window.localStorage.clear()
      this.$store.commit('setUser', null)
      this.$store.commit('setCourses', [])
      this.$router.push('/login')
    },
    handleClose () {
      this.isOpen = false
    },
    clickOutsideMiddleware (e: Event) {
      return (e.target as Element).id !== 'dropdownToggle'
    }
  }
})
</script>
