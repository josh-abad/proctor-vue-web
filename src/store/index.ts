import { RootState } from '@/types'
import { createStore, StoreOptions } from 'vuex'
import alert from './modules/alert'
import courses from './modules/courses'
import exams from './modules/exams'
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
    users
  }
} as StoreOptions<RootState>)

if (module.hot) {
  module.hot.accept(['./mutations', './actions', './getters', './modules/alert', './modules/courses', './modules/exams', './modules/users'], () => {
    store.hotUpdate({
      mutations: require('./mutations'),
      actions: require('./actions'),
      getters: require('./getters'),
      modules: {
        alert: require('./modules/alert'),
        courses: require('./modules/courses'),
        exams: require('./modules/exams'),
        users: require('./modules/users')
      }
    })
  })
}

export default store
