import { Exam, NewExam } from '@/types'
import axios from 'axios'
import { config } from './auth'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/exams`

/**
 * Creates a new exam in the server and returns it
 * @param newExam the information for a new exam
 */
const create = async (newExam: NewExam) => {
  const response = await axios.post<Exam>(baseUrl, newExam, config)
  return response.data
}

const edit = async (id: string, newExam: NewExam) => {
  const response = await axios.put<Exam>(`${baseUrl}/${id}`, newExam, config)
  return response.data
}

/**
 * Deletes an exam from the server
 * @param id the id of the exam to be deleted
 */
const deleteExam = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

const openExam = async (id: string) => {
  const response = await axios.put<Exam>(`${baseUrl}/${id}/open`, {}, config)
  return response.data
}

const closeExam = async (id: string) => {
  const response = await axios.put<Exam>(`${baseUrl}/${id}/close`, {}, config)
  return response.data
}

export default {
  create,
  edit,
  deleteExam,
  openExam,
  closeExam
}
