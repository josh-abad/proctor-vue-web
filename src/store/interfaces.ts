import { Attempt, AuthenticatedUser, Course, Exam, ExamResult, NewCourse, Role, Submission, Theme, User, UserCredentials } from '@/types'
import { ActionContext } from 'vuex'
import * as ActionTypes from './action-types'
import * as MutationTypes from './mutation-types'

export type State = {
  user: AuthenticatedUser | null;
  message: string;
  theme: Theme;
  users: User[];
  courses: Course[];
  exams: Exam[];
  attempts: Attempt[];
  examResults: ExamResult[];
  activeExam: string | null;
}

export interface Mutations<S = State> {
  [MutationTypes.SET_USER] (state: S, payload: AuthenticatedUser | null): void
  [MutationTypes.SET_VERIFIED] (state: S, payload: string): void
  [MutationTypes.SET_MESSAGE] (state: S, payload: string): void
  [MutationTypes.SET_THEME] (state: S, payload: Theme | 'system-dark' | 'system-light'): void
  [MutationTypes.SET_USERS] (state: S, payload: User[]): void
  [MutationTypes.REMOVE_USER] (state: S, payload: string): void
  [MutationTypes.SET_COURSES] (state: S, courses: Course[]): void
  [MutationTypes.ADD_COURSE] (state: S, course: Course): void
  [MutationTypes.REMOVE_COURSE] (state: S, courseId: string): void
  [MutationTypes.UPDATE_COURSE] (state: S, newCourse: Course): void
  [MutationTypes.REMOVE_STUDENT] (state: S, payload: { courseId: string; userId: string }): void
  [MutationTypes.SET_EXAMS] (state: S, exams: Exam[]): void
  [MutationTypes.ADD_EXAM] (state: S, exam: Exam): void
  [MutationTypes.REMOVE_EXAM] (state: S, examId: string): void
  [MutationTypes.SET_ATTEMPTS] (state: S, attempts: Attempt[]): void
  [MutationTypes.SET_EXAM_RESULTS] (state: S, examResults: ExamResult[]): void
  [MutationTypes.ADD_ATTEMPT] (state: S, newAttempt: Attempt): void
  [MutationTypes.UPDATE_ATTEMPT] (state: S, newAttempt: Attempt): void
  [MutationTypes.REMOVE_ATTEMPTS_BY_EXAM] (state: S, examId: string): void
  [MutationTypes.ADD_EXAM_RESULT] (state: S, examResult: ExamResult): void
  [MutationTypes.REMOVE_EXAM_RESULTS_BY_EXAM] (state: S, examId: string): void
  [MutationTypes.SET_ACTIVE_EXAM] (state: S, examId: string | null): void
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
  [ActionTypes.SIGN_UP] (
    { dispatch }: AugmentedActionContext,
    credentials: UserCredentials
  ): Promise<void>
  [ActionTypes.LOG_IN] (
    { commit, dispatch }: AugmentedActionContext,
    { email, password }: { email: string; password: string; }
  ): Promise<void>
  [ActionTypes.LOG_OUT] (
    { commit }: AugmentedActionContext
  ): Promise<void>
  [ActionTypes.VERIFY] (
    { commit, dispatch }: AugmentedActionContext,
    token: string
  ): Promise<void>
  [ActionTypes.ALERT] (
    { commit, dispatch }: AugmentedActionContext,
    message: string
  ): Promise<void>
  [ActionTypes.LOAD_USERS] (
    { commit, dispatch }: AugmentedActionContext
  ): Promise<void>
  [ActionTypes.LOAD_COURSES] (
    { commit, dispatch }: AugmentedActionContext,
    userId?: string
  ): Promise<void>
  [ActionTypes.ENROLL_STUDENT] (
    { commit, dispatch }: AugmentedActionContext,
    { studentId, courseId }: { studentId: string; courseId: string; }
  ): Promise<void>
  [ActionTypes.ENROLL_STUDENTS] (
    { commit, dispatch }: AugmentedActionContext,
    { userIds, courseId }: { userIds: string[]; courseId: string; }
  ): Promise<void>
  [ActionTypes.CREATE_COURSE] (
    { commit, dispatch }: AugmentedActionContext,
    newCourse: NewCourse
  ): Promise<void>
  [ActionTypes.DELETE_COURSE] (
    { commit, dispatch }: AugmentedActionContext,
    courseId: string
  ): Promise<void>
  [ActionTypes.LOAD_EXAMS] (
    { commit, dispatch }: AugmentedActionContext
  ): Promise<void>
  [ActionTypes.DELETE_EXAM] (
    { commit, dispatch }: AugmentedActionContext,
    examId: string
  ): Promise<void>
  [ActionTypes.LOAD_EXAM_RESULTS] (
    { commit, dispatch }: AugmentedActionContext,
    userId?: string
  ): Promise<void>
  [ActionTypes.LOAD_ATTEMPTS] (
    { commit, dispatch }: AugmentedActionContext,
    userId?: string
  ): Promise<void>
  [ActionTypes.START_ATTEMPT] (
    { commit, dispatch }: AugmentedActionContext,
    examId: string
  ): Promise<void>
  [ActionTypes.SUBMIT_EXAM] (
    { commit }: AugmentedActionContext,
    payload: Submission
  ): Promise<void>
}

type AugmentedGetter = {
  [K in keyof Getters]: ReturnType<Getters[K]>
}

export type Getters<S = State> = {
  isLoggedIn (state: S): boolean
  permissions (state: S): (roles: Role[]) => boolean
  hasCourse (state: S): (courseId: string) => boolean
  theme (state: S): Theme
  coordinators (state: S): User[]
  students (state: S): User[]
  studentByID (state: S, getters: AugmentedGetter): (studentId: string) => User | undefined 
  userByID (state: S): (id: string) => User | undefined
  studentsByCourse (state: S, getters: AugmentedGetter): (courseId: string) => (User | undefined)[]
  avatarUrlByUser (state: S): (userId: string) => string | undefined
  courseByID (state: S): (id: string) => Course | undefined
  courses (state: S): Course[]
  examByID (state: S): (id: string) => Exam | undefined
  attemptByID (state: S): (id: string) => Attempt | undefined
  examsByCourse (state: S): (courseId: string) => Exam[]
  examsForUser (state: S): Exam[]
  attemptsByUser (state: S): (userId: string) => Attempt[]
  resultsByUser (state: S): (userId: string) => ExamResult[]
  examsByWeek (state: S, getters: AugmentedGetter): (courseId: string, week: number) => Exam[]
  courseCompletedPercentage (state: S, getters: AugmentedGetter): (courseId: string, userId: string) => number
  getAttemptsByExam (state: S): (examId: string) => Attempt[]
  examTaken (state: S, getters: AugmentedGetter): (examId: string, userId?: string) => boolean
  courseGrades (state: S): (courseId: string, userId: string) => number[]
  courseTotal (state: S, getters: AugmentedGetter): (courseId: string, userId: string) => number
}
