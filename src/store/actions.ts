import { RootState, UserCredentials } from '@/types'
import { ActionTree } from 'vuex'
import { ALERT, LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_RESULTS, LOAD_USERS, LOG_IN, LOG_OUT, SIGN_UP, VERIFY } from './action-types'
import { SET_ATTEMPTS, SET_COURSES, SET_EXAM_RESULTS, SET_USER, SET_VERIFIED } from './mutation-types'
import examAttemptsService from '@/services/exam-attempts'
import examsService from '@/services/exams'
import loginService from '@/services/login'
import usersService from '@/services/users'
import verifyService from '@/services/verify'
import router from '@/router'
import cookie from '@/utils/cookie'

export default {
  async [SIGN_UP] ({ dispatch }, credentials: UserCredentials): Promise<void> {
    try {
      await usersService.create(credentials)
      router.push('/')
    } catch (error) {
      dispatch(ALERT, error.response.data.error)
    }
  },
  async [LOG_IN] ({ commit, dispatch }, { email, password }): Promise<void> {
    try {
      const user = await loginService.login({ email, password })
      commit(SET_USER, user)
      router.push((router.currentRoute.value.query.redirect as string) || '/')
      cookie.set('loggedAppUser', JSON.stringify(user))
      examAttemptsService.setToken(user.token)
      if (user.role !== 'student') {
        examsService.setToken(user.token)
      }
      await Promise.all([
        dispatch(LOAD_USERS),
        dispatch(LOAD_COURSES),
        dispatch(LOAD_EXAMS),
        dispatch(LOAD_ATTEMPTS),
        dispatch(LOAD_EXAM_RESULTS)
      ])
    } catch (error) {
      dispatch(ALERT, 'Incorrect email or password')
    }
  },
  async [LOG_OUT] ({ commit }): Promise<void> {
    localStorage.clear()
    commit(SET_USER, null)
    commit(SET_COURSES, [])
    commit(SET_ATTEMPTS, [])
    commit(SET_EXAM_RESULTS, [])
  },
  async [VERIFY] ({ commit, dispatch }, token: string): Promise<void> {
    try {
      const verifiedUser = await verifyService.verify(token)
      commit(SET_VERIFIED, verifiedUser.id)
    } catch (error) {
      dispatch(ALERT, error.response.data.error)
    }
  }
} as ActionTree<RootState, RootState>
