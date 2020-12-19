<template>
  <div
    class="min-h-screen antialiased bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <DialogModal />
    <div class="flex flex-col dark:text-white text-gray-900">
      <TheNavBar v-show="isLoggedIn" @toggle="handleToggle" :isOpen="isOpen" />
      <div>
        <TheSidebar :isOpen="isOpen" />
        <div>
          <router-view
            class="transform ease-in-out duration-300 px-6 py-4"
            :class="isOpen ? 'ml-48' : 'ml-0'"
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
import DialogModal from './components/DialogModal.vue'
import Snackbar from './components/Snackbar.vue'
import TheNavBar from './components/TheNavBar.vue'
import TheSidebar from './components/TheSidebar.vue'
import examAttemptsService from './services/exam_attempts'
import examResultsService from './services/exam_results'
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
    Snackbar,
    DialogModal
  },
  async mounted () {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.$store.commit('setUser', user)
      examAttemptsService.setToken(user.token)
      const activeExamJSON = window.localStorage.getItem('activeExam')
      if (activeExamJSON) {
        const activeExam = JSON.parse(activeExamJSON)
        examResultsService.setToken(activeExam.token)
        this.$store.commit('setActiveExam', activeExam.attempt.exam)
      }
      // if (user) {
      // this.$store.commit('setUser', await usersService.getUser(user.id))
      // }
    }

    const sidebarState = window.localStorage.getItem('sidebarState')
    if (sidebarState) {
      this.isOpen = JSON.parse(sidebarState)
    }

    const theme = localStorage.getItem('theme')
    this.$store.commit('setTheme', theme)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.$store.commit('setTheme', e.matches ? 'system-dark' : 'system-light')
    })

    await Promise.all([
      this.$store.dispatch('loadCourses'),
      this.$store.dispatch('loadExamItems'),
      this.$store.dispatch('loadExams'),
      this.$store.dispatch('loadAttempts'),
      this.$store.dispatch('loadExamResults')
    ])
  },
  methods: {
    handleToggle () {
      this.isOpen = !this.isOpen
      window.localStorage.setItem('sidebarState', JSON.stringify(this.isOpen))
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isDarkTheme (): boolean {
      return this.$store.state.isDarkTheme
    }
  }
})
</script>
