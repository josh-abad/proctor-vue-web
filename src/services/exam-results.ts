import { Attempt, ExamResult, Submission } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exam-results'

let token: string | null = null

/**
 * Sets the token containing the active attempt information
 * @param newToken the attempt token to be set
 */
const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`
}

/**
 * Checks if an attempt token has been set
 */
const hasToken = (): boolean => !!token

/**
 * Submits the user's answers to an exam. Returns both the result and the corresponding updated attempt.
 * @param submission the user's answers to the exam
 */
const submit = async (submission: Submission): Promise<{ examResult: ExamResult; attempt: Attempt }> => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, submission, config)
  return response.data
}

/**
 * Gets all exam results from every user in the server
 */
const getAll = async (): Promise<ExamResult[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Gets all exam results from a single user
 * @param userId the id of the user
 */
const getByUser = async (userId: string): Promise<ExamResult[]> => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get(baseUrl, { params })
  return response.data
}

export default { submit, setToken, getAll, getByUser, hasToken }
