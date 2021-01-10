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
    store.hotUpdate({
      mutations: require('./mutations'),
      actions: require('./actions'),
      getters: require('./getters'),
      modules: {
        alert: require('./modules/alert'),
        courses: require('./modules/courses'),
        dialog: require('./modules/dialog'),
        exams: require('./modules/exams'),
        theme: require('./modules/theme'),
        users: require('./modules/users')
      }
    })
  })
}

export default store
