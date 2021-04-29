import { RootState } from '@/types'
import { createStore, StoreOptions } from 'vuex'
import alert from './modules/alert'
import courses from './modules/courses'
import exams from './modules/exams'
import theme from './modules/theme'
import users from './modules/users'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state: RootState = {
  user: null
}

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    alert,
    courses,
    exams,
    theme,
    users
  }
} as StoreOptions<RootState>)

if (import.meta.hot) {
  import.meta.hot?.accept([
    './mutations',
    './actions',
    './getters',
    './modules/alert',
    './modules/courses',
    './modules/exams',
    './modules/theme',
    './modules/users'
  ], ([
    newMutations,
    newActions,
    newGetters,
    newAlert,
    newCourses,
    newExams,
    newTheme,
    newUsers
  ]) => {
    store.hotUpdate({
      mutations: newMutations,
      actions: newActions,
      getters: newGetters,
      modules: {
        alert: newAlert,
        courses: newCourses,
        exams: newExams,
        theme: newTheme,
        users: newUsers
      }
    })
  })
}

export default store
