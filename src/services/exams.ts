import { Attempt, Exam, NewExam } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/exams`

let token: string | null = null

/**
 * Sets the token containing the information of the coordinator/admin creating an exam
 * @param newToken the token to be set
 */
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

/**
 * Creates a new exam in the server and returns it
 * @param newExam the information for a new exam
 */
const create = async (newExam: NewExam) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post<Exam>(baseUrl, newExam, config)
  return response.data
}

/**
 * Gets all exams from all courses
 */
const getAll = async () => {
  const response = await axios.get<Exam[]>(baseUrl)
  return response.data
}

/**
 * Gets a single exam
 * @param id the id of the exam
 */
const getExam = async (id: string) => {
  const response = await axios.get<Exam>(`${baseUrl}/${id}`)
  return response.data
}

/**
 * Deletes an exam from the server
 * @param id the id of the exam to be deleted
 */
const deleteExam = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const getAttemptsByUser = async (id: string, userId: string) => {
  const response = await axios.get<Attempt[]>(`${baseUrl}/${id}/attempts/${userId}`)
  return response.data
}

const isExamTaken = async (id: string, userId: string) => {
  const response = await axios.get<{ isTaken: boolean }>(`${baseUrl}/${id}/taken-by/${userId}`)
  return response.data
}

export default { setToken, create, getAll, getExam, deleteExam, getAttemptsByUser, isExamTaken }
