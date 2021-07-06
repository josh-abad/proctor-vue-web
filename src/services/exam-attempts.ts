import { Attempt, AttemptStatus, AttemptWithResult, Score } from '@/types'
import axios from 'axios'
import { config } from './auth'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exam-attempts`

const addWarning = async (id: string) => {
  await axios.post(`${baseUrl}/${id}/warnings`, {}, config)
}

const deleteAttempt = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

/**
 * Starts an exam attempt with the set user token. Returns a token containing the attempt information and the attempt itself.
 * @param examId the id of the exam to be started
 */
const start = async (examId: string) => {
  const response = await axios.post<Attempt>(baseUrl, { examId }, config)
  return response.data
}

const getAttempt = async (id: string, status?: AttemptStatus) => {
  const response = await axios.get<AttemptWithResult>(
    `${baseUrl}/${id}`,
    status ? { ...config, params: { status } } : config
  )
  return response.data
}

const submitPendingGrade = async (id: string, scores: Score[]) => {
  const response = await axios.put<Attempt>(
    `${baseUrl}/${id}/score`,
    { scores },
    config
  )
  return response.data
}

export default {
  addWarning,
  deleteAttempt,
  start,
  getAttempt,
  submitPendingGrade
}
