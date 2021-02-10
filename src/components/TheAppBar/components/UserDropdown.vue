<template>
  <div
    class="relative inline-block text-left"
    v-click-outside="{
      handler: handleClose,
      middleware: clickOutsideMiddleware,
    }"
  >
    <div>
      <button
        @click.prevent="isOpen = !isOpen"
        type="button"
        class="inline-flex items-center justify-center w-full px-4 py-2 text-gray-200 focus:outline-none"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          :src="user?.avatarUrl || ''"
          alt="Avatar"
          class="ml-2 w-8 h-8 object-cover rounded-full"
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
    <transition name="dropdown-fade" v-show="isOpen">
      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-dark-08 text-white"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <router-link
            :to="`/user/${user?.id || ''}`"
            class="block px-4 py-2 text-sm hover:bg-gray-700"
            role="menuitem"
            >Profile</router-link
          >
          <router-link
            to="/settings"
            class="block px-4 py-2 text-sm hover:bg-gray-700"
            role="menuitem"
            >User Settings</router-link
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm hover:bg-gray-700"
            role="menuitem"
            >Support</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm hover:bg-gray-700"
            role="menuitem"
            >License</a
          >
          <button
            @click="handleLogOut"
            class="block w-full text-left px-4 py-2 text-sm border-t border-gray-700 hover:bg-gray-700 focus:outline-none"
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
import { LOG_OUT } from '@/store/action-types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'

export default defineComponent({
  name: 'UserDropdown',
  mixins: [userMixin],
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    async handleLogOut () {
      await this.$store.dispatch(LOG_OUT)
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
