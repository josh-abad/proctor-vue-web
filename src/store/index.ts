import usersService from '@/services/users'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import loginService from '@/services/login'
import {
  AuthenticatedUser,
  Role,
  RootState,
  UserCredentials
} from '@/types'
import { createStore, StoreOptions } from 'vuex'
import verifyService from '@/services/verify'
import alert from './modules/alert'
import courses from './modules/courses'
import dialog from './modules/dialog'
import exams from './modules/exams'
import theme from './modules/theme'
import users from './modules/users'
import { SET_ATTEMPTS, SET_EXAM_RESULTS, SET_RECENT_COURSES, SET_USER, SET_VERIFIED } from './mutation-types'
import { ALERT, LOAD_ATTEMPTS, LOAD_COURSES, LOAD_EXAMS, LOAD_EXAM_RESULTS, LOAD_USERS, LOG_IN, LOG_OUT, SIGN_UP, VERIFY } from './action-types'

export default createStore({
  state: () => ({
    user: null
  }),
  mutations: {
    [SET_USER] (state, user: AuthenticatedUser): void {
      state.user = user
    },
    [SET_VERIFIED] (state, userId: string): void {
      if (state.user && state.user.id === userId) {
        state.user.verified = true
      }
    }
  },
  actions: {
    async [SIGN_UP] ({ commit, dispatch }, credentials: UserCredentials): Promise<void> {
      try {
        const newUser = await usersService.create(credentials)
        localStorage.setItem('loggedAppUser', JSON.stringify(newUser))
        commit(SET_USER, newUser)
      } catch (error) {
        dispatch(ALERT, error)
      }
    },
    async [LOG_IN] ({ commit, dispatch }, { email, password }): Promise<void> {
      try {
        const user = await loginService.login({ email, password })
        commit(SET_USER, user)
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
        const verifiedUser = await verifyService.verify(token)
        commit(SET_VERIFIED, verifiedUser.id)
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    }
  },
  modules: {
    alert,
    courses,
    dialog,
    exams,
    theme,
    users
  },
  getters: {
    isLoggedIn (state): boolean {
      return state.user !== null
    },
    permissions (state): (...roles: Role[]) => boolean {
      return (...roles) => {
        return state.user ? roles.includes(state.user?.role) : false
      }
    }
  }
} as StoreOptions<RootState>)
