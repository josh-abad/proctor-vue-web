import { MutationTree } from 'vuex'
import * as MutationTypes from './mutation-types'
import { State, Mutations } from '@/store/interfaces'

export default {
  [MutationTypes.SET_USER] (state, user) {
    state.user = user
  },
  [MutationTypes.SET_VERIFIED] (state, userId) {
    if (state.user && state.user.id === userId) {
      state.user.verified = true
    }
  },
  [MutationTypes.SET_MESSAGE] (state, message) {
    state.message = message
  },
  [MutationTypes.SET_ACTIVE_EXAM] (state, examId) {
    state.activeExam = examId
  }
} as MutationTree<State> & Mutations
