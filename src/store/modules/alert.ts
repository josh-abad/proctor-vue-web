import { AlertState, RootState } from '@/types'
import { Module } from 'vuex'
import { ALERT } from '../action-types'
import { SET_MESSAGE } from '../mutation-types'

export default {
  state: () => ({
    message: ''
  }),
  mutations: {
    [SET_MESSAGE] (state, message: string): void {
      state.message = message
    }
  },
  actions: {
    async [ALERT] ({ commit }, message: string): Promise<void> {
      commit(SET_MESSAGE, message)
      setTimeout(() => {
        commit(SET_MESSAGE, '')
      }, 5000)
    }
  }
} as Module<AlertState, RootState>
