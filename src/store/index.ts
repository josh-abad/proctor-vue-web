import { RootState } from '@/types'
import { createStore, StoreOptions } from 'vuex'
import alert from './modules/alert'
import courses from './modules/courses'
import dialog from './modules/dialog'
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
    dialog,
    exams,
    theme,
    users
  }
} as StoreOptions<RootState>)

if (module.hot) {
  module.hot.accept(['./mutations', './actions', './getters', './modules/alert', './modules/courses', './modules/dialog', './modules/exams', './modules/theme', './modules/users'], () => {
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    const newGetters = require('./getters').default
    const newAlert = require('./modules/alert').default
    const newCourses = require('./modules/courses').default
    const newDialog = require('./modules/dialog').default
    const newExams = require('./modules/exams').default
    const newTheme = require('./modules/theme').default
    const newUsers = require('./modules/users').default

    store.hotUpdate({
      modules: {
        mutations: newMutations,
        actions: newActions,
        getters: newGetters,
        alert: newAlert,
        courses: newCourses,
        dialog: newDialog,
        exams: newExams,
        theme: newTheme,
        users: newUsers
      }
    })
  })
}

export default store
