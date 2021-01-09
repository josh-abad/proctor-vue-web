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
  }
} as GetterTree<RootState, RootState>
