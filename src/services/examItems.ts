import { ExamItem } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exam-items'

const create = async (newExamItem: ExamItem) => {
  const response = await axios.post(baseUrl, newExamItem)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getExamItem = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { create, getAll, getExamItem }
