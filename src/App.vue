<template>
  <div
    class="min-h-screen antialiased bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white bg-gradient-to-t from-gray-400 to-gray-300 dark:from-gray-900 dark:to-green-900"
  >
    <div id="modals"></div>
    <DialogModal />
    <div class="flex flex-col dark:text-white text-gray-900">
      <TheNavBar
        v-if="isLoggedIn"
        @toggle="handleToggle"
        :isOpen="sidebarOpen"
      />
      <div>
        <TheSidebar :isOpen="sidebarOpen" />
        <div>
          <router-view
            class="transform ease-in-out duration-300 p-6"
            :class="sidebarOpen ? 'ml-52' : 'ml-0'"
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
import examsService from './services/exams'
import examAttemptsService from './services/exam-attempts'
import examResultsService from './services/exam-results'
import { LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_RESULTS, LOAD_USERS } from './store/action-types'
import { SET_ACTIVE_EXAM, SET_RECENT_COURSES, SET_THEME, SET_USER } from './store/mutation-types'

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
  async created () {
    const loggedUserJSON = localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.$store.commit(SET_USER, user)
      examAttemptsService.setToken(user.token)
      const activeExamJSON = localStorage.getItem('activeExam')
      if (user.role !== 'student') {
        examsService.setToken(user.token)
      }
      await Promise.all([
        this.$store.dispatch(LOAD_USERS),
        this.$store.dispatch(LOAD_COURSES),
        this.$store.dispatch(LOAD_EXAMS),
        this.$store.dispatch(LOAD_ATTEMPTS, this.$store.state.user.id),
        this.$store.dispatch(LOAD_EXAM_RESULTS, this.$store.state.user.id)
      ])
      if (activeExamJSON) {
        const activeExam = JSON.parse(activeExamJSON)
        examResultsService.setToken(activeExam.token)
        this.$store.commit(SET_ACTIVE_EXAM, activeExam.attempt.exam)
      }
    }

    const sidebarState = localStorage.getItem('sidebarState')
    if (sidebarState) {
      this.isOpen = JSON.parse(sidebarState)
    }

    const theme = localStorage.getItem('theme')
    this.$store.commit(SET_THEME, theme)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.$store.commit(SET_THEME, e.matches ? 'system-dark' : 'system-light')
    })

    const recentCourses = localStorage.getItem('recentCourses')
    if (recentCourses) {
      this.$store.commit(SET_RECENT_COURSES, JSON.parse(recentCourses))
    }
  },
  methods: {
    handleToggle () {
      this.isOpen = !this.isOpen
      localStorage.setItem('sidebarState', JSON.stringify(this.isOpen))
    }
  },
  computed: {
    sidebarOpen (): boolean {
      return this.isOpen && this.isLoggedIn
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>

<style lang="postcss">
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-300 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-700 rounded-full shadow;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-600;
}

#nprogress {
  @apply pointer-events-none;
}

#nprogress .bar {
  @apply bg-gradient-to-r from-green-700 to-green-500 fixed z-50 top-0 left-0 w-full h-1;
}

#nprogress .peg {
  @apply block absolute right-0 h-full;
  width: 100px;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

#nprogress .spinner {
  @apply block fixed z-50 top-4 right-4;
}

#nprogress .spinner-icon {
  @apply w-5 h-5 box-border animate-spin;
  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;
}

.nprogress-custom-parent {
  @apply overflow-hidden relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  @apply absolute;
}
</style>
