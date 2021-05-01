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
      await Promise.all([
        dispatch(ActionTypes.LOAD_USERS),
        dispatch(ActionTypes.LOAD_COURSES),
        dispatch(ActionTypes.LOAD_EXAMS),
        dispatch(ActionTypes.LOAD_ATTEMPTS),
        dispatch(ActionTypes.LOAD_EXAM_RESULTS)
      ])
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Incorrect email or password')
    }
  },
  async [ActionTypes.LOG_OUT] ({ commit }) {
    localStorage.clear()
    commit(MutationTypes.SET_USER, null)
    commit(MutationTypes.SET_COURSES, [])
    commit(MutationTypes.SET_ATTEMPTS, [])
    commit(MutationTypes.SET_EXAM_RESULTS, [])
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
  async [ActionTypes.LOAD_USERS] ({ commit, dispatch }) {
    try {
      commit(MutationTypes.SET_USERS, await usersService.getAll())
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Could not load users from server')
    }
  },
  async [ActionTypes.LOAD_COURSES] ({ commit, dispatch }, userId) {
    try {
      if (userId) {
        commit(MutationTypes.SET_COURSES, await coursesService.getByUser(userId))
      } else {
        commit(MutationTypes.SET_COURSES, await coursesService.getAll())
      }
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.ENROLL_STUDENT] ({ commit, dispatch }, { studentId, courseId }) {
    try {
      const updatedCourse = await coursesService.enrollUser(studentId, courseId)
      commit(MutationTypes.UPDATE_COURSE, updatedCourse)
      dispatch(ActionTypes.ALERT, 'Student successfully enrolled.')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.ENROLL_STUDENTS] ({ commit, dispatch }, { userIds, courseId }) {
    try {
      const updatedCourse = await coursesService.enrollUsers(userIds, courseId)
      commit(MutationTypes.UPDATE_COURSE, updatedCourse)
      dispatch(ActionTypes.ALERT, 'Students successfully added to course.')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.CREATE_COURSE] ({ commit, dispatch }, newCourse) {
    try {
      const createdCourse = await coursesService.create(newCourse)
      commit(MutationTypes.ADD_COURSE, createdCourse)
      dispatch(ActionTypes.ALERT, 'Course successfully created')
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.DELETE_COURSE] ({ commit, dispatch }, courseId) {
    try {
      await coursesService.deleteCourse(courseId)
      commit(MutationTypes.REMOVE_COURSE, courseId)
      dispatch(ActionTypes.ALERT, 'Course successfully deleted')
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Could not delete course')
    }
  },
  async [ActionTypes.LOAD_EXAMS] ({ commit, dispatch }) {
    try {
      commit(MutationTypes.SET_EXAMS, await examsService.getAll())
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.DELETE_EXAM] ({ commit, dispatch }, examId) {
    try {
      await examsService.deleteExam(examId)
      commit(MutationTypes.REMOVE_EXAM, examId)
      commit(MutationTypes.REMOVE_ATTEMPTS_BY_EXAM, examId)
      commit(MutationTypes.REMOVE_EXAM_RESULTS_BY_EXAM, examId)
      dispatch(ActionTypes.ALERT, 'Exam successfully deleted')
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Could not delete exam')
    }
  },
  async [ActionTypes.LOAD_EXAM_RESULTS] ({ commit, dispatch }, userId) {
    try {
      if (userId) {
        commit(MutationTypes.SET_EXAM_RESULTS, await examResultsService.getByUser(userId))
      } else {
        commit(MutationTypes.SET_EXAM_RESULTS, await examResultsService.getAll())
      }
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.LOAD_ATTEMPTS] ({ commit, dispatch }, userId) {
    try {
      if (userId) {
        commit(MutationTypes.SET_ATTEMPTS, await examAttemptsService.getByUser(userId))
      } else {
        commit(MutationTypes.SET_ATTEMPTS, await examAttemptsService.getAll())
      }
    } catch (error) {
      dispatch(ActionTypes.ALERT, error.response.data.error)
    }
  },
  async [ActionTypes.START_ATTEMPT] ({ commit, dispatch }, examId) {
    try {
      const response = await examAttemptsService.start(examId)
      commit(MutationTypes.ADD_ATTEMPT, response.attempt)
      localStorage.setItem('activeExam', JSON.stringify(response))
      examResultsService.setToken(response.token)
      commit(MutationTypes.SET_ACTIVE_EXAM, response.attempt.exam.id)
    } catch (error) {
      dispatch(ActionTypes.ALERT, 'Attempt could not be started')
    }
  },
  async [ActionTypes.SUBMIT_EXAM] ({ commit }, payload) {
    const response = await examResultsService.submit(payload)
    commit(MutationTypes.ADD_EXAM_RESULT, response.examResult)
    commit(MutationTypes.UPDATE_ATTEMPT, response.attempt)
  }
} as ActionTree<State, State> & Actions
