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
import examAttemptsService from './services/exam-attempts'
import examResultsService from './services/exam-results'
import { LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_ITEMS, LOAD_EXAM_RESULTS } from './store/action-types'
import { SET_ACTIVE_EXAM, SET_RECENT_COURSES, SET_THEME, SET_USER } from './store/mutation-types'
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
      this.$store.commit(SET_USER, user)
      examAttemptsService.setToken(user.token)
      const activeExamJSON = window.localStorage.getItem('activeExam')
      if (activeExamJSON) {
        const activeExam = JSON.parse(activeExamJSON)
        examResultsService.setToken(activeExam.token)
        this.$store.commit(SET_ACTIVE_EXAM, activeExam.attempt.exam)
      }
      // if (user) {
      // this.$store.commit(SET_USER, await usersService.getUser(user.id))
      // }
    }

    const sidebarState = window.localStorage.getItem('sidebarState')
    if (sidebarState) {
      this.isOpen = JSON.parse(sidebarState)
    }

    const theme = localStorage.getItem('theme')
    this.$store.commit(SET_THEME, theme)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.$store.commit(SET_THEME, e.matches ? 'system-dark' : 'system-light')
    })

    await Promise.all([
      this.$store.dispatch(LOAD_COURSES),
      this.$store.dispatch(LOAD_EXAM_ITEMS),
      this.$store.dispatch(LOAD_EXAMS),
      this.$store.dispatch(LOAD_ATTEMPTS),
      this.$store.dispatch(LOAD_EXAM_RESULTS)
    ])

    const recentCourses = localStorage.getItem('recentCourses')
    if (recentCourses) {
      this.$store.commit(SET_RECENT_COURSES, JSON.parse(recentCourses))
    }
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
