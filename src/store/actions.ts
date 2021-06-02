import { ActionTree } from 'vuex'
import * as ActionTypes from './action-types'
import * as MutationTypes from './mutation-types'
import examAttemptsService from '@/services/exam-attempts'
import examsService from '@/services/exams'
import loginService from '@/services/login'
import usersService from '@/services/users'
import verifyService from '@/services/verify'
import router from '@/router'
import cookie from '@/utils/cookie'
import { State, Actions } from '@/store/interfaces'
import coursesService from '@/services/courses'
import examResultsService from '@/services/exam-results'
import useSnackbar from '@/composables/use-snackbar'

const { setSnackbarMessage } = useSnackbar()

export default {
  async [ActionTypes.SIGN_UP](_, credentials) {
    try {
      await usersService.create(credentials)
      router.push('/')
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  },
  async [ActionTypes.LOG_IN]({ commit }, { email, password }) {
    try {
      const user = await loginService.login({ email, password })
      commit(MutationTypes.SET_USER, user)
      router.push((router.currentRoute.value.query.redirect as string) || '/')
      cookie.set('loggedAppUser', JSON.stringify(user))
      examAttemptsService.setToken(user.token)
      if (user.role !== 'student') {
        examsService.setToken(user.token)
      }
    } catch (error) {
      setSnackbarMessage('Incorrect email or password', 'error')
    }
  },
  async [ActionTypes.LOG_OUT]({ commit }) {
    localStorage.clear()
    cookie.remove('loggedAppUser')
    commit(MutationTypes.SET_USER, null)
  },
  async [ActionTypes.VERIFY]({ commit }, token) {
    try {
      const verifiedUser = await verifyService.verify(token)
      commit(MutationTypes.SET_VERIFIED, verifiedUser.id)
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  },
  async [ActionTypes.ENROLL_STUDENT](_, { studentId, courseId }) {
    try {
      await coursesService.enrollUser(studentId, courseId)
      setSnackbarMessage('Student successfully enrolled.', 'success')
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  },
  async [ActionTypes.ENROLL_STUDENTS](_, { userIds, courseId }) {
    try {
      await coursesService.enrollUsers(userIds, courseId)
      setSnackbarMessage('Students successfully added to course.', 'success')
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  },
  async [ActionTypes.CREATE_COURSE](_, newCourse) {
    try {
      await coursesService.create(newCourse)
      setSnackbarMessage('Course successfully created', 'success')
    } catch (error) {
      setSnackbarMessage(error.response.data.error, 'error')
    }
  },
  async [ActionTypes.DELETE_COURSE](_, courseId) {
    try {
      await coursesService.deleteCourse(courseId)
      setSnackbarMessage('Course successfully deleted', 'success')
    } catch (error) {
      setSnackbarMessage('Could not delete course', 'error')
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
