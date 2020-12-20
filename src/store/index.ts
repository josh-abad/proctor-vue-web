import coursesService from '@/services/courses'
import examItemsService from '@/services/exam-items'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import loginService from '@/services/login'
import { Attempt, Course, DialogContent, Exam, ExamItem, ExamResult, State, Theme, User } from '@/types'
import { createStore } from 'vuex'
import { ALERT, LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_ITEMS, LOAD_EXAM_RESULTS, LOG_IN, LOG_OUT, START_ATTEMPT, SUBMIT_EXAM } from './action-types'
import { ADD_ATTEMPT, ADD_EXAM_RESULT, ADD_RECENT_COURSE, CLOSE_DIALOG, DISPLAY_DIALOG, SET_ACTIVE_EXAM, SET_ATTEMPTS, SET_COURSES, SET_EXAMS, SET_EXAM_ITEMS, SET_EXAM_RESULTS, SET_MESSAGE, SET_RECENT_COURSES, SET_THEME, SET_USER, UPDATE_ATTEMPT } from './mutation-types'

const state: State = {
  user: null,
  courses: [],
  recentCourses: [],
  maxRecentCourses: 3,
  examItems: [],
  exams: [],
  message: '',
  attempts: [],
  examResults: [],
  activeExam: null,
  dialog: {
    header: '',
    message: '',
    actionLabel: '',
    closed: true
  },
  theme: 'dark'
}

const mutations = {
  [SET_USER] (state: State, user: User): void {
    state.user = user
  },
  [SET_COURSES] (state: State, courses: Course[]): void {
    state.courses = courses
  },
  [SET_RECENT_COURSES] (state: State, recentCourses: string[]): void {
    state.recentCourses = recentCourses
  },
  [SET_EXAM_ITEMS] (state: State, examItems: ExamItem[]): void {
    state.examItems = examItems
  },
  [SET_EXAMS] (state: State, exams: Exam[]): void {
    state.exams = exams
  },
  [SET_ATTEMPTS] (state: State, attempts: Attempt[]): void {
    state.attempts = attempts
  },
  [SET_EXAM_RESULTS] (state: State, examResults: ExamResult[]): void {
    state.examResults = examResults
  },
  [SET_MESSAGE] (state: State, message: string): void {
    state.message = message
  },
  [ADD_ATTEMPT] (state: State, attempt: Attempt): void {
    state.attempts = state.attempts.concat(attempt)
  },
  [UPDATE_ATTEMPT] (state: State, newAttempt: Attempt): void {
    state.attempts = state.attempts.map(attempt => attempt.id === newAttempt.id ? newAttempt : attempt)
  },
  [ADD_EXAM_RESULT] (state: State, examResult: ExamResult): void {
    state.examResults = state.examResults.concat(examResult)
  },
  [SET_ACTIVE_EXAM] (state: State, examId: string): void {
    state.activeExam = examId
  },
  [DISPLAY_DIALOG] (state: State, dialogContent: Omit<DialogContent, 'closed'>): void {
    state.dialog.closed = false
    state.dialog.header = dialogContent.header
    state.dialog.actionLabel = dialogContent.actionLabel
    state.dialog.message = dialogContent.message
  },
  [CLOSE_DIALOG] (state: State): void {
    state.dialog.closed = true
    state.dialog.header = ''
    state.dialog.actionLabel = ''
    state.dialog.message = ''
  },
  [SET_THEME] (state: State, theme: Theme | 'system-dark' | 'system-light'): void {
    // This is so the logo in TheNavBar will react to change in system theme
    if (theme?.includes('system')) {
      state.theme = theme.split('-')[1] as Theme
      state.theme = null
    } else {
      state.theme = theme as Theme
    }

    if (state.theme) {
      localStorage.setItem('theme', state.theme)
    } else {
      localStorage.removeItem('theme')
    }

    const html = document.querySelector('html')
    if (html) {
      if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  },
  [ADD_RECENT_COURSE] (state: State, courseId: string): void {
    // Don't add invalid courses
    if (!state.courses.some(course => course.id === courseId)) {
      return
    }

    if (state.recentCourses.length >= state.maxRecentCourses) {
      if (state.recentCourses.includes(courseId)) {
        state.recentCourses = state.recentCourses.filter(id => id !== courseId)
      } else {
        state.recentCourses.shift()
      }
    }
    state.recentCourses.push(courseId)
    localStorage.setItem('recentCourses', JSON.stringify(state.recentCourses))
  }
}

const getters = {
  isLoggedIn (state: State): boolean {
    return state.user !== null
  },
  getCourseByID (state: State): (id: string) => Course | undefined {
    return (id) => {
      return state.courses.find(course => course.id === id)
    }
  },
  getExamByID (state: State): (id: string) => Exam | undefined {
    return (id) => {
      return state.exams.find(exam => exam.id === id)
    }
  },
  getAttemptByID (state: State): (id: string) => Attempt | undefined {
    return (id) => {
      return state.attempts.find(attempt => attempt.id === id)
    }
  },
  getExamsByCourse (state: State): (courseId: string) => Exam[] | undefined {
    return (courseId) => {
      return state.exams.filter(exam => {
        return exam.course.id === courseId
      })
    }
  },
  getExamItemsByCourse (state: State): (courseId: string) => ExamItem[] | undefined {
    return (courseId) => {
      return state.examItems.filter(examItem => {
        return examItem.course.id === courseId
      })
    }
  },
  getAttemptsByExam (state: State): (examId: string) => Attempt[] | undefined {
    return (examId) => {
      return state.attempts.filter(attempt => {
        return attempt.exam === examId
      })
    }
  },
  getUserCourses (state: State): Course[] {
    return state.courses.filter(course => {
      return state.user?.courses.some(userCourseId => {
        return course.id === userCourseId
      })
    })
  },
  getRecentCourses (state: State): (Course | undefined)[] {
    const toCourse = (id: string): Course | undefined => {
      return state.courses.find(course => course.id === id)
    }
    const defined = (course: Course | undefined): boolean => {
      return course !== undefined
    }
    return state.recentCourses.map(toCourse).filter(defined).reverse()
  }
}

export default createStore({
  state,
  mutations,
  actions: {
    async [LOAD_COURSES] ({ commit }): Promise<void> {
      try {
        commit(SET_COURSES, await coursesService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [LOAD_EXAM_ITEMS] ({ commit }): Promise<void> {
      try {
        commit(SET_EXAM_ITEMS, await examItemsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [LOAD_EXAMS] ({ commit }): Promise<void> {
      try {
        commit(SET_EXAMS, await examsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [LOAD_EXAM_RESULTS] ({ commit }): Promise<void> {
      try {
        commit(SET_EXAM_RESULTS, await examResultsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [LOAD_ATTEMPTS] ({ commit }): Promise<void> {
      try {
        commit(SET_ATTEMPTS, await examAttemptsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [LOG_IN] ({ commit, dispatch }, { username, password }): Promise<void> {
      try {
        const user = await loginService.login({ username, password })
        commit(SET_USER, user)
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
        examAttemptsService.setToken(user.token)
        commit(SET_ATTEMPTS, await examAttemptsService.getByUser(user.id))
        commit(SET_EXAM_RESULTS, await examResultsService.getByUser(user.id))
      } catch (error) {
        dispatch(ALERT, 'Incorrect username or password')
      }
    },
    async [LOG_OUT] ({ commit }): Promise<void> {
      window.localStorage.clear()
      commit(SET_USER, null)
      commit(SET_COURSES, [])
    },
    async [START_ATTEMPT] ({ commit, dispatch }, examId): Promise<void> {
      try {
        const response = await examAttemptsService.start(examId)
        commit(ADD_ATTEMPT, response.attempt)
        window.localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        commit(SET_ACTIVE_EXAM, response.attempt.exam)
      } catch (error) {
        dispatch(ALERT, 'Attempt could not be started')
      }
    },
    async [ALERT] ({ commit }, message) {
      commit(SET_MESSAGE, message)
      setTimeout(() => {
        commit(SET_MESSAGE, '')
      }, 5000)
    },
    async [SUBMIT_EXAM] ({ commit }, payload) {
      const response = await examResultsService.submit(payload)
      commit(ADD_EXAM_RESULT, response.examResult)
      commit(UPDATE_ATTEMPT, response.attempt)
    }
  },
  modules: {
  },
  getters
})
