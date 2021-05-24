import { AppEvent, Course, Exam, User, UserCredentials } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/users`

/**
 * Registers a new user to the server
 * @param newUser the credentials of the new user
 */
const create = async (newUser: UserCredentials) => {
  const response = await axios.post<User>(baseUrl, newUser)
  return response.data
}

/**
 * Get all users from the server
 */
const getAll = async () => {
  const response = await axios.get<User[]>(baseUrl)
  return response.data
}

const getStudents = async () => {
  const response = await axios.get<User[]>(`${baseUrl}/students`)
  return response.data
}

/**
 * Get a user from the server by their id
 * @param id the user id
 */
const getUser = async (id: string) => {
  const response = await axios.get<User>(`${baseUrl}/${id}`)
  return response.data
}

const getCoordinators = async () => {
  const response = await axios.get<User[]>(`${baseUrl}/coordinators`)
  return response.data
}

const getStudent = async (id: string) => {
  const response = await axios.get<User>(`${baseUrl}/students/${id}`)
  return response.data
}

const getCourses = async (id: string) => {
  const response = await axios.get<Course[]>(`${baseUrl}/${id}/courses`)
  return response.data
}

const addRecentCourse = async (id: string, courseId: string) => {
  const response = await axios.put<User>(`${baseUrl}/${id}/recent-courses`, { courseId })
  return response.data
}

const getRecentCourses = async (id: string, limit = 5) => {
  const response = await axios.get<Course[]>(`${baseUrl}/${id}/recent-courses`, {
    params: { limit }
  })
  return response.data
}

const getOpenExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/open-exams`)
  return response.data
}

const getUpcomingExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

const uploadImage = async (id: string, data: FormData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await axios.post<User>(`${baseUrl}/${id}/reference-image`, data, config)
  return response.data
}

const deleteUser = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const getRecentActivity = async (id: string) => {
  const response = await axios.get<AppEvent[]>(`${baseUrl}/${id}/recent-activity`)
  return response.data
}

export default {
  create,
  getAll,
  getStudents,
  getUser,
  getStudent,
  getCoordinators,
  getCourses,
  addRecentCourse,
  getRecentActivity,
  getRecentCourses,
  getOpenExams,
  getUpcomingExams,
  uploadImage,
  deleteUser
}
