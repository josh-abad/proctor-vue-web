import { Attempt, ExamResult, Submission } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/exam-results`

let token: string | null = null

/**
 * Sets the token containing the active attempt information
 * @param newToken the attempt token to be set
 */
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

/**
 * Checks if an attempt token has been set
 */
const hasToken = () => !!token

/**
 * Submits the user's answers to an exam. Returns both the result and the corresponding updated attempt.
 * @param submission the user's answers to the exam
 */
const submit = async (submission: Submission) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post<{
    examResult: ExamResult;
    attempt: Attempt
  }>(baseUrl, submission, config)
  return response.data
}

/**
 * Gets all exam results from every user in the server
 */
const getAll = async () => {
  const response = await axios.get<ExamResult[]>(baseUrl)
  return response.data
}

/**
 * Gets all exam results from a single user
 * @param userId the id of the user
 */
const getByUser = async (userId: string) => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get<ExamResult[]>(baseUrl, { params })
  return response.data
}

export default { submit, setToken, getAll, getByUser, hasToken }
