import { NewExam } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exams'

const create = async (newExam: NewExam) => {
  const response = await axios.post(baseUrl, newExam)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getExam = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const deleteExam = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { create, getAll, getExam, deleteExam }
