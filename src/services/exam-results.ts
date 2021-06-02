import { Attempt, ExamResult, Submission } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exam-results`

let token: string | null = null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

/**
 * Submits the user's answers to an exam. Returns both the result and the corresponding updated attempt.
 * @param submission the user's answers to the exam
 */
const submit = async (submission: Submission) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post<{
    examResult: ExamResult
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

export default { submit, setToken, getAll }
