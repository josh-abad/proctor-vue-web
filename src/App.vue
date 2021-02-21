<template>
  <div class="min-h-screen antialiased text-gray-900 dark:text-white">
    <div id="modals" />
    <div>
      <TheAppBar
        v-if="isLoggedIn"
        @toggle="handleToggle"
        :is-open="sidebarOpen"
      />
      <div>
        <TheSidebar :is-open="sidebarOpen" />
        <div>
          <router-view
            class="transform ease-in-out duration-300"
            :class="sidebarOpen ? 'ml-auto sm:ml-56' : 'ml-0'"
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
import TheSidebar from './components/TheSidebar/TheSidebar.vue'
import examResultsService from './services/exam-results'
import { SUBMIT_EXAM, VALIDATE_TOKEN } from './store/action-types'
import { SET_ACTIVE_EXAM, SET_RECENT_COURSES, SET_THEME, SET_USER } from './store/mutation-types'
import { Attempt, AuthenticatedUser, Course, Submission } from './types'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    TheSidebar,
    Snackbar
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    sidebarOpen (): boolean {
      return this.isOpen && this.isLoggedIn
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  async created () {
    this.initTheme()
    this.initSidebarState()
    await this.initUser()
    this.initRecentCourses()
  },
  methods: {
    handleToggle (): void {
      this.isOpen = !this.isOpen
      localStorage.setItem('sidebarState', JSON.stringify(this.isOpen))
    },
    initTheme (): void {
      const body = document.querySelector('body')
      if (body) {
        body.classList.add('bg-gray-200')
        body.classList.add('dark:bg-gray-900')
      }

      const theme = localStorage.getItem('theme')
      this.$store.commit(SET_THEME, theme)
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        this.$store.commit(SET_THEME, e.matches ? 'system-dark' : 'system-light')
      })
    },
    initSidebarState (): void {
      const sidebarState = localStorage.getItem('sidebarState')
      if (sidebarState) {
        this.isOpen = JSON.parse(sidebarState)
      }
    },
    async initUser (): Promise<void> {
      const loggedUserJSON = localStorage.getItem('loggedAppUser')
      if (loggedUserJSON) {
        const user: AuthenticatedUser = JSON.parse(loggedUserJSON)
        this.$store.commit(SET_USER, user)
        await this.$store.dispatch(VALIDATE_TOKEN, user.token)

        const activeExamJSON = localStorage.getItem('activeExam')
        if (activeExamJSON) {
          const activeExam: { token: string; attempt: Attempt } = JSON.parse(activeExamJSON)
          examResultsService.setToken(activeExam.token)
          this.$store.commit(SET_ACTIVE_EXAM, activeExam.attempt.exam.id)
        }

        const pendingSubmissionsJSON = localStorage.getItem('pendingSubmission')
        if (pendingSubmissionsJSON) {
          const pendingSubmissions: Submission = JSON.parse(pendingSubmissionsJSON)
          await this.$store.dispatch(SUBMIT_EXAM, pendingSubmissions)
          this.$store.commit(SET_ACTIVE_EXAM, null)
          localStorage.removeItem('pendingSubmission')
          localStorage.removeItem('activeExam')
        }
      }
    },
    initRecentCourses (): void {
      const recentCourses = localStorage.getItem('recentCourses')
      if (recentCourses) {
        this.$store.commit(SET_RECENT_COURSES, JSON.parse(recentCourses))
      } else {
        const courses: Course[] = this.$store.getters.courses
        this.$store.commit(SET_RECENT_COURSES, courses.map(course => course.id))
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

.dropdown-fade-enter-active {
  @apply transition ease-out duration-100 transform;
}

.dropdown-fade-leave-active {
  @apply transition ease-in duration-75 transform;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  @apply opacity-0 scale-95;
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from {
  @apply opacity-100 scale-100;
}

.modal-fade-enter-active {
  @apply transition ease-out duration-300 transform;
}

.modal-fade-leave-active {
  @apply transition ease-in duration-300 transform;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  @apply opacity-0 translate-y-4;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  @apply opacity-100 translate-y-0;
}

.separator-y {
  @apply divide-y divide-gray-300 dark:divide-gray-600;
}

.label-border {
  @apply border-b border-gray-300 dark:border-gray-700;
}
</style>
