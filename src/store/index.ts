import coursesService from '@/services/courses'
import examItemsService from '@/services/examItems'
import examsService from '@/services/exams'
import examResultsServices from '@/services/exam_results'
import loginService from '@/services/login'
import { Course, Exam, ExamItem, State, User } from '@/types'
import { createStore } from 'vuex'

const state: State = {
  user: null,
  courses: [],
  examItems: [],
  exams: [],
  message: ''
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
  setMessage (state: State, message: string): void {
    state.message = message
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
    async logIn ({ commit, dispatch }, { username, password }): Promise<void> {
      try {
        const user = await loginService.login({ username, password })
        commit('setUser', user)
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
        examResultsServices.setToken(user.token)
      } catch (error) {
        dispatch('alert', 'Incorrect username or password')
      }
    },
    async alert ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('setMessage', '')
      }, 5000)
    }
  },
  modules: {
  },
  getters
})
