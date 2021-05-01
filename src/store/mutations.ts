import { Theme } from '@/types'
import { alphabeticalCourses, alphabeticalUsers } from '@/utils/sort'
import { MutationTree } from 'vuex'
import * as MutationTypes from './mutation-types'
import { State, Mutations } from '@/store/interfaces'

export default {
  [MutationTypes.SET_USER] (state, user) {
    state.user = user
  },
  [MutationTypes.SET_VERIFIED] (state, userId) {
    if (state.user && state.user.id === userId) {
      state.user.verified = true
    }
  },
  [MutationTypes.SET_MESSAGE] (state, message) {
    state.message = message
  },
  [MutationTypes.SET_THEME] (state, theme) {
    // This is so the logo in NavBar will react to change in system theme
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
  [MutationTypes.SET_USERS] (state, users) {
    if (users) {
      users.sort(alphabeticalUsers)
    }
    state.users = users
  },
  [MutationTypes.REMOVE_USER] (state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },
  [MutationTypes.SET_COURSES] (state, courses) {
    if (courses) {
      courses.sort(alphabeticalCourses)
    }
    state.courses = courses
  },
  [MutationTypes.ADD_COURSE] (state, course) {
    state.courses = state.courses.concat(course)
  },
  [MutationTypes.REMOVE_COURSE] (state, courseId) {
    state.courses = state.courses.filter(course => course.id !== courseId)
  },
  [MutationTypes.UPDATE_COURSE] (state, newCourse) {
    state.courses = state.courses.map(course => course.id === newCourse.id ? newCourse : course)
  },
  [MutationTypes.REMOVE_STUDENT] (state, payload) {
    const { courseId, userId } = payload
    state.courses = state.courses.map(course => {
      return course.id === courseId
        ? { ...course, studentsEnrolled: course.studentsEnrolled.filter(user => user !== userId) }
        : course
    })
  },
  [MutationTypes.SET_EXAMS] (state, exams) {
    state.exams = exams
  },
  [MutationTypes.ADD_EXAM] (state, exam) {
    state.exams = state.exams.concat(exam)
  },
  [MutationTypes.REMOVE_EXAM] (state, examId) {
    state.exams = state.exams.filter(exam => exam.id !== examId)
  },
  [MutationTypes.SET_ATTEMPTS] (state, attempts) {
    state.attempts = attempts
  },
  [MutationTypes.SET_EXAM_RESULTS] (state, examResults) {
    state.examResults = examResults
  },
  [MutationTypes.ADD_ATTEMPT] (state, newAttempt) {
    if (!state.attempts.some(attempt => attempt.id === newAttempt.id)) {
      state.attempts = state.attempts.concat(newAttempt)
    }
  },
  [MutationTypes.UPDATE_ATTEMPT] (state, newAttempt) {
    state.attempts = state.attempts.map(attempt => attempt.id === newAttempt.id ? newAttempt : attempt)
  },
  [MutationTypes.REMOVE_ATTEMPTS_BY_EXAM] (state, examId) {
    state.attempts = state.attempts.filter(attempt => attempt.exam?.id !== examId)
  },
  [MutationTypes.ADD_EXAM_RESULT] (state, examResult) {
    state.examResults = state.examResults.concat(examResult)
  },
  [MutationTypes.REMOVE_EXAM_RESULTS_BY_EXAM] (state, examId) {
    state.examResults = state.examResults.filter(result => result.exam !== examId)
  },
  [MutationTypes.SET_ACTIVE_EXAM] (state, examId) {
    state.activeExam = examId
  }
} as MutationTree<State> & Mutations
