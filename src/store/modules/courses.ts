import { Course, CoursesState, NewCourse, RootState } from '@/types'
import { Module } from 'vuex'
import { ALERT, CREATE_COURSE, DELETE_COURSE, ENROLL_STUDENT, ENROLL_STUDENTS, LOAD_COURSES } from '../action-types'
import { ADD_COURSE, ADD_RECENT_COURSE, REMOVE_COURSE, SET_COURSES, SET_RECENT_COURSES, UPDATE_COURSE } from '../mutation-types'
import coursesService from '@/services/courses'
import { alphabeticalCourses } from '@/utils/sort'

const MAX_RECENT_COURSES = 3

export default {
  state: () => ({
    courses: [],
    recentCourses: []
  }),
  mutations: {
    [SET_COURSES] (state, courses: Course[]): void {
      courses.sort(alphabeticalCourses)
      state.courses = courses
    },
    [ADD_COURSE] (state, course: Course): void {
      state.courses = state.courses.concat(course)
    },
    [REMOVE_COURSE] (state, courseId: string): void {
      state.courses = state.courses.filter(course => course.id !== courseId)
    },
    [UPDATE_COURSE] (state, newCourse: Course): void {
      state.courses = state.courses.map(course => course.id === newCourse.id ? newCourse : course)
    },
    [SET_RECENT_COURSES] (state, recentCourses: string[]): void {
      state.recentCourses = recentCourses
    },
    [ADD_RECENT_COURSE] (state, courseId: string): void {
    // Don't add invalid courses
      if (!state.courses.some(course => course.id === courseId)) {
        return
      }

      if (state.recentCourses.includes(courseId)) {
        state.recentCourses = state.recentCourses.filter(id => id !== courseId)
      }

      if (state.recentCourses.length >= MAX_RECENT_COURSES) {
        state.recentCourses.shift()
      }

      state.recentCourses.push(courseId)
      localStorage.setItem('recentCourses', JSON.stringify(state.recentCourses))
    }
  },
  actions: {
    async [LOAD_COURSES] ({ commit, dispatch }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(SET_COURSES, await coursesService.getByUser(userId))
        } else {
          commit(SET_COURSES, await coursesService.getAll())
        }
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [ENROLL_STUDENT] ({ commit, dispatch }, { studentId, courseId }): Promise<void> {
      try {
        const updatedCourse = await coursesService.enrollUser(studentId, courseId)
        commit(UPDATE_COURSE, updatedCourse)
        dispatch(ALERT, 'Student successfully enrolled.')
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [ENROLL_STUDENTS] ({ commit, dispatch }, { userIds, courseId }): Promise<void> {
      try {
        const updatedCourse = await coursesService.enrollUsers(userIds, courseId)
        commit(UPDATE_COURSE, updatedCourse)
        dispatch(ALERT, 'Students successfully added to course.')
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [CREATE_COURSE] ({ commit, dispatch }, newCourse: NewCourse): Promise<void> {
      try {
        const createdCourse = await coursesService.create(newCourse)
        commit(ADD_COURSE, createdCourse)
        dispatch(ALERT, 'Course successfully created')
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [DELETE_COURSE] ({ commit, dispatch }, courseId: string): Promise<void> {
      try {
        await coursesService.deleteCourse(courseId)
        commit(REMOVE_COURSE, courseId)
        dispatch(ALERT, 'Course successfully deleted')
      } catch (error) {
        dispatch(ALERT, 'Could not delete course')
      }
    }
  },
  getters: {
    getCourseByID (state): (id: string) => Course | undefined {
      return (id) => {
        return state.courses.find(course => course.id === id)
      }
    },
    getRecentCourses (state): (Course | undefined)[] {
      const toCourse = (id: string): Course | undefined => {
        return state.courses.find(course => course.id === id)
      }
      const defined = (course: Course | undefined): boolean => {
        return course !== undefined
      }
      return state.recentCourses.map(toCourse).filter(defined).reverse()
    },
    courses (state, getters, rootState): Course[] {
      if (!rootState.user) {
        return []
      }

      const byStudent = (course: Course) => {
        return rootState.user ? course.studentsEnrolled.includes(rootState.user.id) : false
      }

      const byCoordinator = (course: Course) => {
        return rootState.user ? course.coordinator.id === rootState.user.id : false
      }

      if (rootState.user.role === 'student') {
        return state.courses.filter(byStudent)
      } else if (rootState.user.role === 'coordinator') {
        return state.courses.filter(byCoordinator)
      }
      return state.courses
    }
  }
} as Module<CoursesState, RootState>
