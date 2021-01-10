import { RootState, UserCredentials } from '@/types'
import { ActionTree } from 'vuex'
import { ALERT, LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_RESULTS, LOAD_USERS, LOG_IN, LOG_OUT, SIGN_UP, VALIDATE_TOKEN, VERIFY } from './action-types'
import { SET_ATTEMPTS, SET_EXAM_RESULTS, SET_RECENT_COURSES, SET_USER, SET_VERIFIED } from './mutation-types'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import examsService from '@/services/exams'
import loginService from '@/services/login'
import usersService from '@/services/users'
import verifyService from '@/services/verify'
import router from '@/router'
import nProgress from 'nprogress'

export default {
  async [SIGN_UP] ({ dispatch }, credentials: UserCredentials): Promise<void> {
    try {
      nProgress.start()
      await usersService.create(credentials)
      router.push('/')
      nProgress.done()
    } catch (error) {
      nProgress.done()
      dispatch(ALERT, error.response.data.error)
    }
  },
  async [LOG_IN] ({ commit, dispatch }, { email, password }): Promise<void> {
    try {
      nProgress.start()
      const user = await loginService.login({ email, password })
      commit(SET_USER, user)
      router.push((router.currentRoute.value.query.redirect as string) || '/')
      nProgress.done()
      localStorage.setItem('loggedAppUser', JSON.stringify(user))
      examAttemptsService.setToken(user.token)
      if (user.role !== 'student') {
        examsService.setToken(user.token)
        await Promise.all([
          dispatch(LOAD_USERS),
          dispatch(LOAD_COURSES),
          dispatch(LOAD_EXAMS),
          dispatch(LOAD_ATTEMPTS, user.id),
          dispatch(LOAD_EXAM_RESULTS, user.id)
        ])
      }
      commit(SET_ATTEMPTS, await examAttemptsService.getByUser(user.id))
      commit(SET_EXAM_RESULTS, await examResultsService.getByUser(user.id))
    } catch (error) {
      nProgress.done()
      dispatch(ALERT, 'Incorrect email or password')
    }
  },
  async [LOG_OUT] ({ commit }): Promise<void> {
    localStorage.clear()
    commit(SET_USER, null)
    commit(SET_RECENT_COURSES, [])
  },
  async [VERIFY] ({ commit, dispatch }, token: string): Promise<void> {
    try {
      nProgress.start()
      const verifiedUser = await verifyService.verify(token)
      nProgress.done()
      commit(SET_VERIFIED, verifiedUser.id)
    } catch (error) {
      nProgress.done()
      dispatch(ALERT, error.response.data.error)
    }
  },
  async [VALIDATE_TOKEN] ({ commit, dispatch }, { id, token }): Promise<void> {
    try {
      const validatedUser = await usersService.validateUserToken(id, token)
      commit(SET_USER, validatedUser)
      localStorage.setItem('loggedAppUser', JSON.stringify(validatedUser))
      examAttemptsService.setToken(validatedUser.token)
      if (validatedUser.role !== 'student') {
        examsService.setToken(validatedUser.token)
        await Promise.all([
          dispatch(LOAD_USERS),
          dispatch(LOAD_COURSES),
          dispatch(LOAD_EXAMS),
          dispatch(LOAD_ATTEMPTS, validatedUser.id),
          dispatch(LOAD_EXAM_RESULTS, validatedUser.id)
        ])
      }
      commit(SET_ATTEMPTS, await examAttemptsService.getByUser(validatedUser.id))
      commit(SET_EXAM_RESULTS, await examResultsService.getByUser(validatedUser.id))
    } catch (error) {
      commit(SET_USER, null)
      localStorage.removeItem('loggedAppUser')
      router.push('/login')
    }
  }
} as ActionTree<RootState, RootState>
