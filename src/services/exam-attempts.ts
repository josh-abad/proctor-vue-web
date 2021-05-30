import { Attempt } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exam-attempts`

let token: string | null = null

/**
 * Sets the token containing the user's authenticated information
 * @param newToken the token to be set
 */
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

/**
 * Starts an exam attempt with the set user token. Returns a token containing the attempt information and the attempt itself.
 * @param examId the id of the exam to be started
 */
const start = async (examId: string) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post<{ token: string; attempt: Attempt }>(baseUrl, { examId }, config)
  return response.data
}

const getAttempt = async (id: string) => {
  const response = await axios.get<Attempt>(`${baseUrl}/${id}`)
  return response.data
}

/**
 * Gets all attempts from every user in the server
 */
const getAll = async () => {
  const response = await axios.get<Attempt[]>(baseUrl)
  return response.data
}

export default { start, getAttempt, setToken, getAll }
