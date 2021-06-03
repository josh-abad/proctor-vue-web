import { Attempt, AttemptStatus } from '@/types'
import axios from 'axios'
import { config } from './auth'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exam-attempts`

/**
 * Starts an exam attempt with the set user token. Returns a token containing the attempt information and the attempt itself.
 * @param examId the id of the exam to be started
 */
const start = async (examId: string) => {
  const response = await axios.post<Attempt>(baseUrl, { examId }, config)
  return response.data
}

const getAttempt = async (id: string, status?: AttemptStatus) => {
  const response = await axios.get<Attempt>(
    `${baseUrl}/${id}`,
    status ? { params: { status } } : undefined
  )
  return response.data
}

/**
 * Gets all attempts from every user in the server
 */
const getAll = async () => {
  const response = await axios.get<Attempt[]>(baseUrl)
  return response.data
}

export default { start, getAttempt, getAll }
