import { Attempt, Exam, ExamResult, ExamsState, RootState } from '@/types'
import { Module } from 'vuex'
import { ALERT, DELETE_EXAM, LOAD_ATTEMPTS, LOAD_EXAMS, LOAD_EXAM_RESULTS, START_ATTEMPT, SUBMIT_EXAM } from '../action-types'
import { ADD_ATTEMPT, ADD_EXAM, ADD_EXAM_RESULT, REMOVE_EXAM, SET_ACTIVE_EXAM, SET_ATTEMPTS, SET_EXAMS, SET_EXAM_RESULTS, UPDATE_ATTEMPT } from '../mutation-types'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'

export default {
  state: () => ({
    exams: [],
    attempts: [],
    examResults: [],
    activeExam: null
  }),
  mutations: {
    [SET_EXAMS] (state, exams: Exam[]): void {
      state.exams = exams
    },
    [ADD_EXAM] (state, exam: Exam): void {
      state.exams = state.exams.concat(exam)
    },
    [REMOVE_EXAM] (state, examId: string): void {
      state.exams = state.exams.filter(exam => exam.id !== examId)
    },
    [SET_ATTEMPTS] (state, attempts: Attempt[]): void {
      state.attempts = attempts
    },
    [SET_EXAM_RESULTS] (state, examResults: ExamResult[]): void {
      state.examResults = examResults
    },
    [ADD_ATTEMPT] (state, attempt: Attempt): void {
      state.attempts = state.attempts.concat(attempt)
    },
    [UPDATE_ATTEMPT] (state, newAttempt: Attempt): void {
      state.attempts = state.attempts.map(attempt => attempt.id === newAttempt.id ? newAttempt : attempt)
    },
    [ADD_EXAM_RESULT] (state, examResult: ExamResult): void {
      state.examResults = state.examResults.concat(examResult)
    },
    [SET_ACTIVE_EXAM] (state, examId: string): void {
      state.activeExam = examId
    }
  },
  actions: {
    async [LOAD_EXAMS] ({ commit, dispatch }): Promise<void> {
      try {
        commit(SET_EXAMS, await examsService.getAll())
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [DELETE_EXAM] ({ commit, dispatch }, examId: string): Promise<void> {
      try {
        await examsService.deleteExam(examId)
        commit(REMOVE_EXAM, examId)
        dispatch(ALERT, 'Exam successfully deleted')
      } catch (error) {
        dispatch(ALERT, 'Could not delete exam')
      }
    },
    async [LOAD_EXAM_RESULTS] ({ commit, dispatch }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(SET_EXAM_RESULTS, await examResultsService.getByUser(userId))
        } else {
          commit(SET_EXAM_RESULTS, await examResultsService.getAll())
        }
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [LOAD_ATTEMPTS] ({ commit, dispatch }, userId?: string): Promise<void> {
      try {
        if (userId) {
          commit(SET_ATTEMPTS, await examAttemptsService.getByUser(userId))
        } else {
          commit(SET_ATTEMPTS, await examAttemptsService.getAll())
        }
      } catch (error) {
        dispatch(ALERT, error.response.data.error)
      }
    },
    async [START_ATTEMPT] ({ commit, dispatch }, examId): Promise<void> {
      try {
        const response = await examAttemptsService.start(examId)
        commit(ADD_ATTEMPT, response.attempt)
        localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        commit(SET_ACTIVE_EXAM, response.attempt.exam)
      } catch (error) {
        dispatch(ALERT, 'Attempt could not be started')
      }
    },
    async [SUBMIT_EXAM] ({ commit }, payload) {
      const response = await examResultsService.submit(payload)
      commit(ADD_EXAM_RESULT, response.examResult)
      commit(UPDATE_ATTEMPT, response.attempt)
    }
  },
  getters: {
    getExamByID (state): (id: string) => Exam | undefined {
      return (id) => {
        return state.exams.find(exam => exam.id === id)
      }
    },
    getAttemptByID (state): (id: string) => Attempt | undefined {
      return (id) => {
        return state.attempts.find(attempt => attempt.id === id)
      }
    },
    getExamsByCourse (state): (courseId: string) => Exam[] | undefined {
      return (courseId) => {
        return state.exams.filter(exam => {
          return exam.course.id === courseId
        })
      }
    },
    courseCompletedPercentage (state): (courseId: string) => number | undefined {
      return (courseId) => {
        const exams = state.exams.filter(exam => exam.course.id === courseId)
        const examsTaken = exams.map(exam => state.examResults.find(result => result.exam === exam.id)).filter(exam => !!exam)
        const percentage = examsTaken.length / exams.length * 100
        return examsTaken.length === 0 ? 0 : percentage
      }
    },
    getAttemptsByExam (state): (examId: string) => Attempt[] | undefined {
      return (examId) => {
        return state.attempts.filter(attempt => {
          return attempt.exam === examId
        })
      }
    },
    examTaken (state): (examId: string) => boolean {
      return examId => {
        return state.examResults.some(result => result.exam === examId)
      }
    }
  }
} as Module<ExamsState, RootState>
