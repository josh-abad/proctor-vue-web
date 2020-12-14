import { NewUser } from '@/types'
import axios from 'axios'
const baseUrl = '/api/courses'

const create = async (newCourse: NewUser) => {
  const response = await axios.post(baseUrl, newCourse)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getCourse = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { create, getAll, getCourse }
