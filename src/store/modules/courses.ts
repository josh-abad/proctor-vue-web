import { Course, CoursesState, NewCourse, RootState } from '@/types'
import { Module } from 'vuex'
import { ALERT, CREATE_COURSE, DELETE_COURSE, ENROLL_STUDENT, ENROLL_STUDENTS, LOAD_COURSES } from '../action-types'
import { ADD_COURSE, REMOVE_COURSE, SET_COURSES, UPDATE_COURSE } from '../mutation-types'
import coursesService from '@/services/courses'
import { alphabeticalCourses } from '@/utils/sort'
import nProgress from 'nprogress'

export default {
  state: () => ({
    courses: []
  }),
  mutations: {
    [SET_COURSES] (state, courses: Course[]): void {
      if (courses) {
        courses.sort(alphabeticalCourses)
      }
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
        nProgress.start()
        const updatedCourse = await coursesService.enrollUser(studentId, courseId)
        nProgress.done()
        commit(UPDATE_COURSE, updatedCourse)
        dispatch(ALERT, 'Student successfully enrolled.')
      } catch (error) {
        nProgress.done()
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [ENROLL_STUDENTS] ({ commit, dispatch }, { userIds, courseId }): Promise<void> {
      try {
        nProgress.start()
        const updatedCourse = await coursesService.enrollUsers(userIds, courseId)
        nProgress.done()
        commit(UPDATE_COURSE, updatedCourse)
        dispatch(ALERT, 'Students successfully added to course.')
      } catch (error) {
        nProgress.done()
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [CREATE_COURSE] ({ commit, dispatch }, newCourse: NewCourse): Promise<void> {
      try {
        nProgress.start()
        const createdCourse = await coursesService.create(newCourse)
        nProgress.done()
        commit(ADD_COURSE, createdCourse)
        dispatch(ALERT, 'Course successfully created')
      } catch (error) {
        nProgress.done()
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [DELETE_COURSE] ({ commit, dispatch }, courseId: string): Promise<void> {
      try {
        nProgress.start()
        await coursesService.deleteCourse(courseId)
        nProgress.done()
        commit(REMOVE_COURSE, courseId)
        dispatch(ALERT, 'Course successfully deleted')
      } catch (error) {
        nProgress.done()
        dispatch(ALERT, 'Could not delete course')
      }
    }
  },
  getters: {
    courseByID (state): (id: string) => Course | undefined {
      return (id) => {
        return state.courses.find(course => course.id === id)
      }
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
