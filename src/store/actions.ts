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

export default {
  async [ActionTypes.SIGN_UP] ({ dispatch }, credentials) {
    try {
      await usersService.create(credentials)
      router.push('/')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.LOG_IN] ({ commit, dispatch }, { email, password }) {
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
      dispatch(ActionTypes.ALERT, 'Incorrect email or password')
    }
  },
  async [ActionTypes.LOG_OUT] ({ commit }) {
    localStorage.clear()
    cookie.remove('loggedAppUser')
    commit(MutationTypes.SET_USER, null)
  },
  async [ActionTypes.VERIFY] ({ commit, dispatch }, token) {
    try {
      const verifiedUser = await verifyService.verify(token)
      commit(MutationTypes.SET_VERIFIED, verifiedUser.id)
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.ALERT] ({ commit }, message) {
    commit(MutationTypes.SET_MESSAGE, message)
    setTimeout(() => {
      commit(MutationTypes.SET_MESSAGE, '')
    }, 5000)
  },
  async [ActionTypes.ENROLL_STUDENT] ({ dispatch }, { studentId, courseId }) {
    try {
      await coursesService.enrollUser(studentId, courseId)
      dispatch(ActionTypes.ALERT, 'Student successfully enrolled.')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.ENROLL_STUDENTS] ({ dispatch }, { userIds, courseId }) {
    try {
      await coursesService.enrollUsers(userIds, courseId)
      dispatch(ActionTypes.ALERT, 'Students successfully added to course.')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.CREATE_COURSE] ({ dispatch }, newCourse) {
    try {
      await coursesService.create(newCourse)
      dispatch(ActionTypes.ALERT, 'Course successfully created')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.DELETE_COURSE] ({ dispatch }, courseId) {
    try {
      await coursesService.deleteCourse(courseId)
      dispatch(ActionTypes.ALERT, 'Course successfully deleted')
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Could not delete course')
    }
  },
  async [ActionTypes.DELETE_EXAM] ({ dispatch }, examId) {
    try {
      await examsService.deleteExam(examId)
      dispatch(ActionTypes.ALERT, 'Exam successfully deleted')
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Could not delete exam')
    }
  },
  async [ActionTypes.START_ATTEMPT] ({ commit, dispatch }, examId) {
    try {
      const response = await examAttemptsService.start(examId)
      localStorage.setItem('activeExam', JSON.stringify(response))
      examResultsService.setToken(response.token)
      commit(MutationTypes.SET_ACTIVE_EXAM, response.attempt.exam.id)
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Attempt could not be started')
    }
  },
  async [ActionTypes.SUBMIT_EXAM] (_, payload) {
    await examResultsService.submit(payload)
  }
} as ActionTree<State, State> & Actions
