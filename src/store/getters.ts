import { GetterTree } from 'vuex'
import { State, Getters } from '@/store/interfaces'

export default {
  permissions (state) {
    return (roles) => {
      return state.user ? roles.includes(state.user.role) : false
    }
  },
  hasCourse (state) {
    return courseId => {
      return !!state.user && state.user.courses.includes(courseId)
    }
  }
} as GetterTree<State, State> & Getters
