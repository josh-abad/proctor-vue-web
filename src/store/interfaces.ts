import { AuthenticatedUser, Role, Submission } from '@/types'
import { ActionContext } from 'vuex'
import * as ActionTypes from './action-types'
import * as MutationTypes from './mutation-types'

export type State = {
  user: AuthenticatedUser | null
}

export interface Mutations<S = State> {
  [MutationTypes.SET_USER](state: S, payload: AuthenticatedUser | null): void
  [MutationTypes.SET_VERIFIED](state: S, payload: string): void
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>
} & Omit<ActionContext<State, State>, 'commit' | 'dispatch'>

export interface Actions {
  [ActionTypes.LOG_OUT]({ commit }: AugmentedActionContext): Promise<void>
  [ActionTypes.VERIFY](
    { commit, dispatch }: AugmentedActionContext,
    token: string
  ): Promise<void>
  [ActionTypes.ENROLL_STUDENT](
    { commit, dispatch }: AugmentedActionContext,
    { studentId, courseId }: { studentId: string; courseId: string }
  ): Promise<void>
  [ActionTypes.ENROLL_STUDENTS](
    { commit, dispatch }: AugmentedActionContext,
    { userIds, courseId }: { userIds: string[]; courseId: string }
  ): Promise<void>
  [ActionTypes.DELETE_COURSE](
    { commit, dispatch }: AugmentedActionContext,
    courseId: string
  ): Promise<void>
  [ActionTypes.DELETE_EXAM](
    { commit, dispatch }: AugmentedActionContext,
    examId: string
  ): Promise<void>
  [ActionTypes.START_ATTEMPT](
    { commit, dispatch }: AugmentedActionContext,
    examId: string
  ): Promise<void>
  [ActionTypes.SUBMIT_EXAM](
    { commit }: AugmentedActionContext,
    payload: Submission
  ): Promise<void>
}

export type Getters<S = State> = {
  permissions(state: S): (roles: Role[]) => boolean
  hasCourse(state: S): (slug: string) => boolean
}
