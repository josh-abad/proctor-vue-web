import { AppEvent, Course, User, UserCredentials } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/users`

/**
 * Registers a new user to the server
 * @param newUser the credentials of the new user
 */
const create = async (newUser: UserCredentials): Promise<User> => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

/**
 * Get all users from the server
 */
const getAll = async (): Promise<User[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Get a user from the server by their id
 * @param id the user id
 */
const getUser = async (id: string): Promise<User> => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getCourses = async (id: string): Promise<Course[]> => {
  const response = await axios.get(`${baseUrl}/${id}/courses`)
  return response.data
}

const addRecentCourse = async (id: string, courseId: string): Promise<User> => {
  const response = await axios.put(`${baseUrl}/${id}/recent-courses`, { courseId })
  return response.data
}

const getRecentCourses = async (id: string): Promise<Course[]> => {
  const response = await axios.get(`${baseUrl}/${id}/recent-courses`)
  return response.data
}

const getUpcomingExams = async (id: string): Promise<AppEvent[]> => {
  const response = await axios.get(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

const uploadImage = async (id: string, data: FormData): Promise<User> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await axios.post(`${baseUrl}/${id}/reference-image`, data, config)
  return response.data
}

const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  create,
  getAll,
  getUser,
  getCourses,
  addRecentCourse,
  getRecentCourses,
  getUpcomingExams,
  uploadImage,
  deleteUser
}
