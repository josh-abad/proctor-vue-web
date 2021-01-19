import { Exam, NewExam } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exams'

let token: string | null = null

/**
 * Sets the token containing the information of the coordinator/admin creating an exam
 * @param newToken the token to be set
 */
const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`
}

/**
 * Creates a new exam in the server and returns it
 * @param newExam the information for a new exam
 */
const create = async (newExam: NewExam): Promise<Exam> => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newExam, config)
  return response.data
}

/**
 * Gets all exams from all courses
 */
const getAll = async (): Promise<Exam[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Gets a single exam
 * @param id the id of the exam
 */
const getExam = async (id: string): Promise<Exam> => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

/**
 * Deletes an exam from the server
 * @param id the id of the exam to be deleted
 */
const deleteExam = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { setToken, create, getAll, getExam, deleteExam }
