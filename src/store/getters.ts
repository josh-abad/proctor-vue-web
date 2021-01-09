import { Role, RootState } from '@/types'
import { GetterTree } from 'vuex'

export default {
  isLoggedIn (state): boolean {
    return state.user !== null
  },
  permissions (state): (...roles: Role[]) => boolean {
    return (...roles) => {
      return state.user ? roles.includes(state.user?.role) : false
    }
  },
  hasCourse (state): (courseId: string) => boolean {
    return courseId => {
      return !!state.user && state.user.courses.includes(courseId)
    }
  }
} as GetterTree<RootState, RootState>
