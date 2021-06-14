import { ActionTree } from 'vuex'
import * as ActionTypes from './action-types'
import * as MutationTypes from './mutation-types'
import verifyService from '@/services/verify'
import { State, Actions } from '@/store/interfaces'
import useSnackbar from '@/composables/use-snackbar'

const { setSnackbarMessage } = useSnackbar()

export default {
  async [ActionTypes.VERIFY]({ commit }, token) {
    try {
      const verifiedUser = await verifyService.verify(token)
      commit(MutationTypes.SET_VERIFIED, verifiedUser.id)
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  }
} as ActionTree<State, State> & Actions
