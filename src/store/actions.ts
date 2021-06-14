import { ActionTree } from 'vuex'
import * as ActionTypes from './action-types'
import * as MutationTypes from './mutation-types'
import examAttemptsService from '@/services/exam-attempts'
import examsService from '@/services/exams'
import verifyService from '@/services/verify'
import { State, Actions } from '@/store/interfaces'
import examResultsService from '@/services/exam-results'
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
  },
  async [ActionTypes.DELETE_EXAM](_, examId) {
    try {
      await examsService.deleteExam(examId)
      setSnackbarMessage('Exam successfully deleted', 'success')
    } catch (error) {
      setSnackbarMessage('Could not delete exam', 'error')
    }
  },
  async [ActionTypes.START_ATTEMPT](_, examId) {
    try {
      await examAttemptsService.start(examId)
    } catch (error) {
      setSnackbarMessage('Attempt could not be started', 'error')
    }
  },
  async [ActionTypes.SUBMIT_EXAM](_, payload) {
    await examResultsService.submit(payload)
  }
} as ActionTree<State, State> & Actions
