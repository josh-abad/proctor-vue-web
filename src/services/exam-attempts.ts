import { Attempt } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exam-attempts'

let token: string | null = null

/**
 * Sets the token containing the user's authenticated information
 * @param newToken the token to be set
 */
const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`
}

/**
 * Starts an exam attempt with the set user token. Returns a token containing the attempt information and the attempt itself.
 * @param examId the id of the exam to be started
 */
const start = async (examId: string): Promise<{ token: string; attempt: Attempt }> => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, { examId }, config)
  return response.data
}

/**
 * Gets all attempts from every user in the server
 */
const getAll = async (): Promise<Attempt[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Gets all attempts from a single user
 * @param userId the id of the user
 */
const getByUser = async (userId: string): Promise<Attempt> => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get(baseUrl, { params })
  return response.data
}

export default { start, setToken, getAll, getByUser }
