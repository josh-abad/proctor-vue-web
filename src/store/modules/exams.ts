import { Attempt, Exam, ExamResult, ExamsState, RootState } from '@/types'
import { Module } from 'vuex'
import { ALERT, DELETE_EXAM, LOAD_ATTEMPTS, LOAD_EXAMS, LOAD_EXAM_RESULTS, START_ATTEMPT, SUBMIT_EXAM } from '../action-types'
import { ADD_ATTEMPT, ADD_EXAM, ADD_EXAM_RESULT, REMOVE_EXAM, SET_ACTIVE_EXAM, SET_ATTEMPTS, SET_EXAMS, SET_EXAM_RESULTS, UPDATE_ATTEMPT } from '../mutation-types'
import examsService from '@/services/exams'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import nProgress from 'nprogress'

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
        nProgress.start()
        await examsService.deleteExam(examId)
        nProgress.done()
        commit(REMOVE_EXAM, examId)
        dispatch(ALERT, 'Exam successfully deleted')
      } catch (error) {
        nProgress.done()
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
        nProgress.start()
        const response = await examAttemptsService.start(examId)
        nProgress.done()
        commit(ADD_ATTEMPT, response.attempt)
        localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        commit(SET_ACTIVE_EXAM, response.attempt.exam.id)
      } catch (error) {
        nProgress.done()
        dispatch(ALERT, 'Attempt could not be started')
      }
    },
    async [SUBMIT_EXAM] ({ commit }, payload) {
      nProgress.start()
      const response = await examResultsService.submit(payload)
      nProgress.done()
      commit(ADD_EXAM_RESULT, response.examResult)
      commit(UPDATE_ATTEMPT, response.attempt)
    }
  },
  getters: {
    examByID (state): (id: string) => Exam | undefined {
      return id => state.exams.find(exam => exam.id === id)
    },
    attemptByID (state): (id: string) => Attempt | undefined {
      return id => state.attempts.find(attempt => attempt.id === id)
    },
    examsByCourse (state): (courseId: string) => Exam[] {
      return courseId => state.exams.filter(exam => exam.course.id === courseId)
    },
    attemptsByUser (state): (userId: string) => Attempt[] {
      return userId => state.attempts ? state.attempts.filter(attempt => attempt.user === userId) : []
    },
    resultsByUser (state): (userId: string) => ExamResult[] {
      return userId => state.examResults.filter(result => {
        return result.user.id === userId
      })
    },
    examsByWeek (state, getters): (courseId: string, week: number) => Exam[] {
      return (courseId, week) => (getters.examsByCourse(courseId) as Exam[]).filter(exam => exam.week === week)
    },
    courseCompletedPercentage (state, getters): (courseId: string, userId: string) => number {
      return (courseId, userId) => {
        const exams: Exam[] = getters.examsByCourse(courseId)
        const examsTaken = exams.filter(exam => getters.examTaken(exam.id, userId))
        const percentage = examsTaken.length / exams.length * 100
        return examsTaken.length === 0 ? 0 : Math.floor(percentage)
      }
    },
    getAttemptsByExam (state): (examId: string) => Attempt[] {
      return examId => state.attempts.filter(attempt => attempt.exam && attempt.exam.id === examId)
    },
    examTaken (state, getters): (examId: string, userId?: string) => boolean {
      return (examId, userId?) => {
        const results: ExamResult[] = userId ? getters.resultsByUser(userId) : state.examResults
        return results.some(result => result.exam === examId)
      }
    },
    recentActivities (state, getters): (userId?: string) => Attempt[] {
      return (userId?) => {
        const attempts: Attempt[] = userId ? getters.attemptsByUser(userId) : state.attempts
        const sortedAttempts = [...attempts].sort((a, b) => {
          return new Date(b.endDate).valueOf() - new Date(a.endDate).valueOf()
        })
        return sortedAttempts.slice(0, 5)
      }
    }
  }
} as Module<ExamsState, RootState>
