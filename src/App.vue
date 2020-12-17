<template>
  <div
    class="min-h-screen antialiased bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <div class="flex flex-col dark:text-white text-gray-900">
      <TheNavBar v-show="isLoggedIn" @toggle="handleToggle" :isOpen="isOpen" />
      <div class="flex justify-center items-start">
        <TheSidebar
          :isOpen="isOpen"
          @nav-click="handleNavClick"
          v-click-outside="{
            handler: handleClose,
            middleware: clickOutsideMiddleware,
          }"
        />
        <div class="flex flex-col items-center">
          <router-view />
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
import TheNavBar from './components/TheNavBar.vue'
import TheSidebar from './components/TheSidebar.vue'
import examAttemptsService from './services/exam_attempts'
// import usersService from './services/users'

export default defineComponent({
  name: 'App',
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    TheNavBar,
    TheSidebar,
    Snackbar
  },
  async mounted () {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.$store.commit('setUser', user)
      examAttemptsService.setToken(user.token)
      // if (user) {
      // this.$store.commit('setUser', await usersService.getUser(user.id))
      // }
    }
    await Promise.all([
      this.$store.dispatch('loadCourses'),
      this.$store.dispatch('loadExamItems'),
      this.$store.dispatch('loadExams'),
      this.$store.dispatch('loadAttempts')
    ])
  },
  methods: {
    handleToggle () {
      this.isOpen = !this.isOpen
    },
    handleClose () {
      this.isOpen = false
    },
    handleNavClick (e: Event, url: string) {
      e.preventDefault()
      this.$router.push(url)
      this.isOpen = false
    },
    clickOutsideMiddleware (e: Event): boolean {
      return (e.target as Element).id !== 'sidebarToggle'
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>
