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
        <TheSidebar :is-open="sidebarOpen" @close-sidebar="isOpen = false" />
        <div>
          <router-view
            class="duration-300 ease-in-out transform"
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
import { LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_RESULTS, LOAD_USERS, SUBMIT_EXAM } from './store/action-types'
import { SET_ACTIVE_EXAM, SET_THEME, SET_USER } from './store/mutation-types'
import { Attempt, AuthenticatedUser, Submission } from './types'
import examAttemptsService from '@/services/exam-attempts'
import examsService from '@/services/exams'
import cookie from '@/utils/cookie'
import useLocalStorage from '@/composables/use-local-storage'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    TheSidebar,
    Snackbar
  },
  setup () {
    const isOpen = useLocalStorage('sidebarState', false)

    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      handleToggle
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
    await this.initUser()
  },
  methods: {
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
    async initUser (): Promise<void> {
      const loggedUserJSON = cookie.get('loggedAppUser')
      if (loggedUserJSON) {
        cookie.set('loggedAppUser', loggedUserJSON)
        const user: AuthenticatedUser = JSON.parse(loggedUserJSON)
        this.$store.commit(SET_USER, user)
        examAttemptsService.setToken(user.token)
        if (user.role !== 'student') {
          examsService.setToken(user.token)
        }
        await Promise.all([
          this.$store.dispatch(LOAD_USERS),
          this.$store.dispatch(LOAD_COURSES),
          this.$store.dispatch(LOAD_EXAMS),
          this.$store.dispatch(LOAD_ATTEMPTS),
          this.$store.dispatch(LOAD_EXAM_RESULTS)
        ])

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
  @apply divide-y divide-gray-300 dark:divide-gray-700;
}

.label-border {
  @apply border-b border-gray-300 dark:border-gray-700;
}
</style>
