import usersService from '@/services/users'
import coursesService from '@/services/courses'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import loginService from '@/services/login'
import {
  Attempt,
  AuthenticatedUser,
  Course,
  DialogContent,
  Exam,
  ExamResult,
  NewCourse,
  Role,
  State,
  Theme,
  User,
  UserCredentials
} from '@/types'
import { createStore } from 'vuex'
import * as actionType from './action-types'
import * as mutationType from './mutation-types'
import { alphabeticalUsers } from '@/utils/sort'

const state: State = {
  user: null,
  users: [],
  courses: [],
  recentCourses: [],
  maxRecentCourses: 6,
  exams: [],
  message: '',
  attempts: [],
  examResults: [],
  activeExam: null,
  dialog: {
    header: '',
    message: '',
    actionLabel: '',
    closed: true
  },
  theme: 'dark'
}

const mutations = {
  [mutationType.SET_USER] (state: State, user: AuthenticatedUser): void {
    state.user = user
  },
  [mutationType.SET_USERS] (state: State, users: Omit<User, 'token'>[]): void {
    state.users = users
  },
  [mutationType.SET_COURSES] (state: State, courses: Course[]): void {
    state.courses = courses
  },
  [mutationType.ADD_COURSE] (state: State, course: Course): void {
    state.courses = state.courses.concat(course)
  },
  [mutationType.REMOVE_COURSE] (state: State, courseId: string): void {
    state.courses = state.courses.filter(course => course.id !== courseId)
  },
  [mutationType.UPDATE_COURSE] (state: State, newCourse: Course): void {
    state.courses = state.courses.map(course => course.id === newCourse.id ? newCourse : course)
  },
  [mutationType.SET_RECENT_COURSES] (state: State, recentCourses: string[]): void {
    state.recentCourses = recentCourses
  },
  [mutationType.SET_EXAMS] (state: State, exams: Exam[]): void {
    state.exams = exams
  },
  [mutationType.ADD_EXAM] (state: State, exam: Exam): void {
    state.exams = state.exams.concat(exam)
  },
  [mutationType.REMOVE_EXAM] (state: State, examId: string): void {
    state.exams = state.exams.filter(exam => exam.id !== examId)
  },
  [mutationType.SET_ATTEMPTS] (state: State, attempts: Attempt[]): void {
    state.attempts = attempts
  },
  [mutationType.SET_EXAM_RESULTS] (state: State, examResults: ExamResult[]): void {
    state.examResults = examResults
  },
  [mutationType.SET_MESSAGE] (state: State, message: string): void {
    state.message = message
  },
  [mutationType.ADD_ATTEMPT] (state: State, attempt: Attempt): void {
    state.attempts = state.attempts.concat(attempt)
  },
  [mutationType.UPDATE_ATTEMPT] (state: State, newAttempt: Attempt): void {
    state.attempts = state.attempts.map(attempt => attempt.id === newAttempt.id ? newAttempt : attempt)
  },
  [mutationType.ADD_EXAM_RESULT] (state: State, examResult: ExamResult): void {
    state.examResults = state.examResults.concat(examResult)
  },
  [mutationType.SET_ACTIVE_EXAM] (state: State, examId: string): void {
    state.activeExam = examId
  },
  [mutationType.DISPLAY_DIALOG] (state: State, dialogContent: Omit<DialogContent, 'closed'>): void {
    state.dialog.closed = false
    state.dialog.header = dialogContent.header
    state.dialog.actionLabel = dialogContent.actionLabel
    state.dialog.message = dialogContent.message
  },
  [mutationType.CLOSE_DIALOG] (state: State): void {
    state.dialog.closed = true
    state.dialog.header = ''
    state.dialog.actionLabel = ''
    state.dialog.message = ''
  },
  [mutationType.SET_THEME] (state: State, theme: Theme | 'system-dark' | 'system-light'): void {
    // This is so the logo in TheNavBar will react to change in system theme
    if (theme?.includes('system')) {
      state.theme = theme.split('-')[1] as Theme
      state.theme = null
    } else {
      state.theme = theme as Theme
    }

    if (state.theme) {
      localStorage.setItem('theme', state.theme)
    } else {
      localStorage.removeItem('theme')
    }

    const html = document.querySelector('html')
    if (html) {
      if (state.theme === 'dark' || (!state.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  },
  [mutationType.ADD_RECENT_COURSE] (state: State, courseId: string): void {
    // Don't add invalid courses
    if (!state.courses.some(course => course.id === courseId)) {
      return
    }

    if (state.recentCourses.includes(courseId)) {
      state.recentCourses = state.recentCourses.filter(id => id !== courseId)
    }

    if (state.recentCourses.length >= state.maxRecentCourses) {
      state.recentCourses.shift()
    }

    state.recentCourses.push(courseId)
    localStorage.setItem('recentCourses', JSON.stringify(state.recentCourses))
  }
}

const getters = {
  isLoggedIn (state: State): boolean {
    return state.user !== null
  },
  userRole (state: State): Role | undefined {
    return state.user?.role
  },
  getCourseByID (state: State): (id: string) => Course | undefined {
    return (id) => {
      return state.courses.find(course => course.id === id)
    }
  },
  studentsByCourse (state: State): (courseId: string, sorted?: boolean) => (User | undefined)[] | undefined {
    return (courseId, sorted = false) => {
      const course = state.courses.find(course => course.id === courseId)
      const students = course?.studentsEnrolled.map(studentId => {
        return state.users.find(student => student.id === studentId)
      })
      if (sorted && students) {
        students.sort(alphabeticalUsers)
      }
      return students
    }
  },
  getExamByID (state: State): (id: string) => Exam | undefined {
    return (id) => {
      return state.exams.find(exam => exam.id === id)
    }
  },
  getAttemptByID (state: State): (id: string) => Attempt | undefined {
    return (id) => {
      return state.attempts.find(attempt => attempt.id === id)
    }
  },
  getExamsByCourse (state: State): (courseId: string) => Exam[] | undefined {
    return (courseId) => {
      return state.exams.filter(exam => {
        return exam.course.id === courseId
      })
    }
  },
  courseCompletedPercentage (state: State): (courseId: string) => number | undefined {
    return (courseId) => {
      const exams = state.exams.filter(exam => exam.course.id === courseId)
      const examsTaken = exams.map(exam => state.examResults.find(result => result.exam === exam.id)).filter(exam => !!exam)
      const percentage = examsTaken.length / exams.length * 100
      return examsTaken.length === 0 ? 0 : percentage
    }
  },
  // getExamItemsByCourse (state: State): (courseId: string) => ExamItem[] | undefined {
  //   return (courseId) => {
  //     return state.examItems.filter(examItem => {
  //       return examItem.course.id === courseId
  //     })
  //   }
  // },
  studentByID (state: State): (studentId: string) => Omit<User, 'token'> | undefined {
    return studentId => {
      return state.users.filter(user => user.role === 'student').find(student => student.id === studentId)
    }
  },
  /**
   * Returns all users that have a student role alphabetically
   * @param {State} state the application state
   */
  students (state: State): Omit<User, 'token'>[] {
    return [...state.users.filter(user => user.role === 'student')].sort(alphabeticalUsers)
  },
  getAttemptsByExam (state: State): (examId: string) => Attempt[] | undefined {
    return (examId) => {
      return state.attempts.filter(attempt => {
        return attempt.exam === examId
      })
    }
  },
  courses (state: State): Course[] {
    if (!state.user) return []

    const byStudent = (course: Course) => {
      return course.studentsEnrolled.includes((state.user as Omit<User, 'token'>).id)
    }

    const byCoordinator = (course: Course) => {
      return course.coordinator.id === state.user?.id
    }

    if (state.user.role === 'student') {
      return state.courses.filter(byStudent)
    } else if (state.user.role === 'coordinator') {
      return state.courses.filter(byCoordinator)
    }
    return state.courses
  },
  sortedCourses (state: State): Course[] {
    const alphabetical = (a: Course, b: Course) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    }
    return state.courses.sort(alphabetical)
  },
  getRecentCourses (state: State): (Course | undefined)[] {
    const toCourse = (id: string): Course | undefined => {
      return state.courses.find(course => course.id === id)
    }
    const defined = (course: Course | undefined): boolean => {
      return course !== undefined
    }
    return state.recentCourses.map(toCourse).filter(defined).reverse()
  },
  coordinators (state: State): Omit<User, 'token'>[] {
    return state.users.filter(user => user.role === 'coordinator')
  },
  permissions (state: State): (...roles: Role[]) => boolean {
    return (...roles) => {
      if (!state.user) {
        return false
      }
      return roles.includes((state.user as AuthenticatedUser).role)
    }
  },
  examTaken (state: State): (examId: string) => boolean {
    return examId => {
      return state.examResults.some(result => result.exam === examId)
    }
  }
}

export default createStore({
  state,
  mutations,
  actions: {
    async [actionType.LOAD_COURSES] ({ commit }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(mutationType.SET_COURSES, await coursesService.getByUser(userId))
        } else {
          commit(mutationType.SET_COURSES, await coursesService.getAll())
        }
      } catch (error) {
        console.error(error)
      }
    },
    async [actionType.LOAD_USERS] ({ commit, dispatch }): Promise<void> {
      try {
        commit(mutationType.SET_USERS, await usersService.getAll())
      } catch (error) {
        dispatch(actionType.ALERT, 'Could not load users from server')
      }
    },
    async [actionType.ENROLL_STUDENT] ({ commit, dispatch }, { studentId, courseId }): Promise<void> {
      try {
        const updatedCourse = await coursesService.enrollUser(studentId, courseId)
        commit(mutationType.UPDATE_COURSE, updatedCourse)
        dispatch(actionType.ALERT, 'Student successfully enrolled.')
      } catch (error) {
        dispatch(actionType.ALERT, error.response.data.error)
      }
    },
    async [actionType.ENROLL_STUDENTS] ({ commit, dispatch }, { userIds, courseId }): Promise<void> {
      try {
        const updatedCourse = await coursesService.enrollUsers(userIds, courseId)
        commit(mutationType.UPDATE_COURSE, updatedCourse)
        dispatch(actionType.ALERT, 'Students successfully added to course.')
      } catch (error) {
        dispatch(actionType.ALERT, error.response.data.error)
      }
    },
    async [actionType.CREATE_COURSE] ({ commit, dispatch }, newCourse: NewCourse): Promise<void> {
      try {
        const createdCourse = await coursesService.create(newCourse)
        commit(mutationType.ADD_COURSE, createdCourse)
        dispatch(actionType.ALERT, 'Course successfully created')
      } catch (error) {
        dispatch(actionType.ALERT, error.response.data.error)
      }
    },
    async [actionType.DELETE_COURSE] ({ commit, dispatch }, courseId: string): Promise<void> {
      try {
        await coursesService.deleteCourse(courseId)
        commit(mutationType.REMOVE_COURSE, courseId)
        dispatch(actionType.ALERT, 'Course successfully deleted')
      } catch (error) {
        dispatch(actionType.ALERT, 'Could not delete course')
      }
    },
    async [actionType.LOAD_EXAMS] ({ commit }): Promise<void> {
      try {
        commit(mutationType.SET_EXAMS, await examsService.getAll())
      } catch (error) {
        console.error(error)
      }
    },
    async [actionType.DELETE_EXAM] ({ commit, dispatch }, examId: string): Promise<void> {
      try {
        await examsService.deleteExam(examId)
        commit(mutationType.REMOVE_EXAM, examId)
        dispatch(actionType.ALERT, 'Exam successfully deleted')
      } catch (error) {
        dispatch(actionType.ALERT, 'Could not delete exam')
      }
    },
    async [actionType.LOAD_EXAM_RESULTS] ({ commit }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(mutationType.SET_EXAM_RESULTS, await examResultsService.getByUser(userId))
        } else {
          commit(mutationType.SET_EXAM_RESULTS, await examResultsService.getAll())
        }
      } catch (error) {
        console.error(error)
      }
    },
    async [actionType.LOAD_ATTEMPTS] ({ commit }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(mutationType.SET_ATTEMPTS, await examAttemptsService.getByUser(userId))
        } else {
          commit(mutationType.SET_ATTEMPTS, await examAttemptsService.getAll())
        }
      } catch (error) {
        console.error(error)
      }
    },
    async [actionType.SIGN_UP] ({ commit, dispatch }, credentials: UserCredentials): Promise<void> {
      try {
        const newUser = await usersService.create(credentials)
        localStorage.setItem('loggedAppUser', JSON.stringify(newUser))
        commit(mutationType.SET_USER, newUser)
      } catch (error) {
        dispatch(actionType.ALERT, error)
      }
    },
    async [actionType.LOG_IN] ({ commit, dispatch }, { username, password }): Promise<void> {
      try {
        const user = await loginService.login({ username, password })
        commit(mutationType.SET_USER, user)
        localStorage.setItem('loggedAppUser', JSON.stringify(user))
        examAttemptsService.setToken(user.token)
        if (user.role !== 'student') {
          examsService.setToken(user.token)
          await Promise.all([
            dispatch(actionType.LOAD_USERS),
            dispatch(actionType.LOAD_COURSES),
            dispatch(actionType.LOAD_EXAMS),
            dispatch(actionType.LOAD_ATTEMPTS, user.id),
            dispatch(actionType.LOAD_EXAM_RESULTS, user.id)
          ])
        }
        commit(mutationType.SET_ATTEMPTS, await examAttemptsService.getByUser(user.id))
        commit(mutationType.SET_EXAM_RESULTS, await examResultsService.getByUser(user.id))
      } catch (error) {
        dispatch(actionType.ALERT, 'Incorrect username or password')
      }
    },
    async [actionType.LOG_OUT] ({ commit }): Promise<void> {
      localStorage.clear()
      commit(mutationType.SET_USER, null)
    },
    async [actionType.START_ATTEMPT] ({ commit, dispatch }, examId): Promise<void> {
      try {
        const response = await examAttemptsService.start(examId)
        commit(mutationType.ADD_ATTEMPT, response.attempt)
        localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        commit(mutationType.SET_ACTIVE_EXAM, response.attempt.exam)
      } catch (error) {
        dispatch(actionType.ALERT, 'Attempt could not be started')
      }
    },
    async [actionType.ALERT] ({ commit }, message) {
      commit(mutationType.SET_MESSAGE, message)
      setTimeout(() => {
        commit(mutationType.SET_MESSAGE, '')
      }, 5000)
    },
    async [actionType.SUBMIT_EXAM] ({ commit }, payload) {
      const response = await examResultsService.submit(payload)
      commit(mutationType.ADD_EXAM_RESULT, response.examResult)
      commit(mutationType.UPDATE_ATTEMPT, response.attempt)
    }
  },
  modules: {
  },
  getters
})
