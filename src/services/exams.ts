import { NewExam } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exams'

let token: string | null = null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const create = async (newExam: NewExam) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newExam, config)
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

export default { setToken, create, getAll, getExam, deleteExam }
