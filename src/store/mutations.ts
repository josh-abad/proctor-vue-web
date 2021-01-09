import { AuthenticatedUser, RootState } from '@/types'
import { MutationTree } from 'vuex'
import { SET_USER, SET_VERIFIED } from './mutation-types'

export default {
  [SET_USER] (state, user: AuthenticatedUser): void {
    state.user = user
  },
  [SET_VERIFIED] (state, userId: string): void {
    if (state.user && state.user.id === userId) {
      state.user.verified = true
    }
  }
} as MutationTree<RootState>
