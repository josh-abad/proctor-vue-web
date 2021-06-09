import { GetterTree } from 'vuex'
import { State, Getters } from '@/store/interfaces'

export default {
  permissions(state) {
    return roles => {
      return state.user ? roles.includes(state.user.role) : false
    }
  },
  hasCourse(state) {
    return slug => {
      return (
        !!state.user && state.user.courses.some(course => course.slug === slug)
      )
    }
  }
} as GetterTree<State, State> & Getters
