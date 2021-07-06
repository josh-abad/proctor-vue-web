import { Attempt, ExamResult, Submission } from '@/types'
import axios from 'axios'
import { config } from './auth'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exam-results`

/**
 * Submits the user's answers to an exam. Returns both the result and the corresponding updated attempt.
 * @param submission the user's answers to the exam
 */
const submit = async (submission: Submission) => {
  const response = await axios.post<{
    examResult: ExamResult
    attempt: Attempt
  }>(baseUrl, submission, config)
  return response.data
}

export default { submit }
