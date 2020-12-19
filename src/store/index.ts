import coursesService from '@/services/courses'
import examItemsService from '@/services/examItems'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam_attempts'
import examResultsService from '@/services/exam_results'
import loginService from '@/services/login'
import { Attempt, Course, DialogContent, Exam, ExamItem, ExamResult, State, User } from '@/types'
import { createStore } from 'vuex'

const state: State = {
  user: null,
  courses: [],
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
  }
}

const mutations = {
  setUser (state: State, user: User): void {
    state.user = user
  },
  setCourses (state: State, courses: Course[]): void {
    state.courses = courses
  },
  setExamItems (state: State, examItems: ExamItem[]): void {
    state.examItems = examItems
  },
  setExams (state: State, exams: Exam[]): void {
    state.exams = exams
  },
  setAttempts (state: State, attempts: Attempt[]): void {
    state.attempts = attempts
  },
  setExamResults (state: State, examResults: ExamResult[]): void {
    state.examResults = examResults
  },
  setMessage (state: State, message: string): void {
    state.message = message
  },
  addAttempt (state: State, attempt: Attempt): void {
    state.attempts = state.attempts.concat(attempt)
  },
  updateAttempt (state: State, newAttempt: Attempt): void {
    state.attempts = state.attempts.map(attempt => attempt.id === newAttempt.id ? newAttempt : attempt)
  },
  addExamResult (state: State, examResult: ExamResult): void {
    state.examResults = state.examResults.concat(examResult)
  },
  setActiveExam (state: State, examId: string): void {
    state.activeExam = examId
  },
  displayDialog (state: State, dialogContent: Omit<DialogContent, 'closed'>): void {
    state.dialog.closed = false
    state.dialog.header = dialogContent.header
    state.dialog.actionLabel = dialogContent.actionLabel
    state.dialog.message = dialogContent.message
  },
  closeDialog (state: State): void {
    state.dialog.closed = true
    state.dialog.header = ''
    state.dialog.actionLabel = ''
    state.dialog.message = ''
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
  }
}

export default createStore({
  state,
  mutations,
  actions: {
    async loadCourses ({ commit }): Promise<void> {
      try {
        commit('setCourses', await coursesService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async loadExamItems ({ commit }): Promise<void> {
      try {
        commit('setExamItems', await examItemsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async loadExams ({ commit }): Promise<void> {
      try {
        commit('setExams', await examsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async loadExamResults ({ commit }): Promise<void> {
      try {
        commit('setExamResults', await examResultsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async loadAttempts ({ commit }): Promise<void> {
      try {
        commit('setAttempts', await examAttemptsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async logIn ({ commit, dispatch }, { username, password }): Promise<void> {
      try {
        const user = await loginService.login({ username, password })
        commit('setUser', user)
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
        examAttemptsService.setToken(user.token)
        commit('setAttempts', await examAttemptsService.getByUser(user.id))
        commit('setExamResults', await examResultsService.getByUser(user.id))
      } catch (error) {
        dispatch('alert', 'Incorrect username or password')
      }
    },
    async startAttempt ({ commit, dispatch }, examId): Promise<void> {
      try {
        const response = await examAttemptsService.start(examId)
        commit('addAttempt', response.attempt)
        window.localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        commit('setActiveExam', response.attempt.exam)
      } catch (error) {
        dispatch('alert', 'Attempt could not be started')
      }
    },
    async alert ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('setMessage', '')
      }, 5000)
    },
    async submitExam ({ commit }, payload) {
      const response = await examResultsService.submit(payload)
      commit('addExamResult', response.examResult)
      commit('updateAttempt', response.attempt)
    }
  },
  modules: {
  },
  getters
})
