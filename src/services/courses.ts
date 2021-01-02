import { NewCourse } from '@/types'
import axios from 'axios'
const baseUrl = '/api/courses'

const create = async (newCourse: NewCourse) => {
  const response = await axios.post(baseUrl, newCourse)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const getByCoordinator = async (coordinatorId: string) => {
//   const params = new URLSearchParams({ coordinatorId })
//   const response = await axios.get(baseUrl, { params })
//   return response.data
// }

const getCourse = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getByUser = async (userId: string) => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get(baseUrl, { params })
  return response.data
}

const enrollUser = async (userId: string, courseId: string) => {
  const response = await axios.put(`${baseUrl}/${courseId}`, { userId })
  return response.data
}

const enrollUsers = async (userIds: string[], courseId: string) => {
  const response = await axios.put(`${baseUrl}/${courseId}`, { userIds })
  return response.data
}

const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { create, getAll, getByUser, getCourse, enrollUser, enrollUsers, deleteCourse }
