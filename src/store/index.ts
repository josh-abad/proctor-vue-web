import coursesService from '@/services/courses'
import examItemsService from '@/services/examItems'
import loginService from '@/services/login'
import { Course, ExamItemContent, State, User } from '@/types'
import { createStore } from 'vuex'

const state: State = {
  user: null,
  courses: [],
  examItems: [],
  message: ''
}

const mutations = {
  setUser (state: State, user: User): void {
    state.user = user
  },
  setCourses (state: State, courses: Course[]): void {
    state.courses = courses
  },
  setExamItems (state: State, examItems: ExamItemContent[]): void {
    state.examItems = examItems
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
  getExamItemsByCourse (state: State): (courseId: string) => ExamItemContent[] | undefined {
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
    async logIn ({ commit, dispatch }, { username, password }): Promise<void> {
      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
        commit('setUser', user)
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
