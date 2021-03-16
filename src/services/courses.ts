import { AppEvent, Course, NewCourse } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/courses`

/**
 * Creates a new course in the server and returns it
 * @param newCourse the information for the new course
 */
const create = async (newCourse: NewCourse): Promise<Course> => {
  const response = await axios.post(baseUrl, newCourse)
  return response.data
}

/**
 * Gets all courses from the server
 */
const getAll = async (): Promise<Course[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Gets a course from the server by its ID
 * @param id the id of the course
 */
const getCourse = async (id: string): Promise<Course> => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

/**
 * Gets all courses a specified user is enrolled in
 * @param userId the id of the user
 */
const getByUser = async (userId: string): Promise<Course[]> => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get(baseUrl, { params })
  return response.data
}

/**
 * Adds a user to a course's enrolled students and returns the updated course
 * @param userId the id of the user
 * @param courseId the id of the course
 */
const enrollUser = async (userId: string, courseId: string): Promise<Course> => {
  const response = await axios.put(`${baseUrl}/${courseId}`, { userId })
  return response.data
}

/**
 * Adds multiple users to a course's enrolled students at once and returns the updated course
 * @param userIds an array of each user's id
 * @param courseId the id of the course
 */
const enrollUsers = async (userIds: string[], courseId: string): Promise<Course> => {
  const response = await axios.put(`${baseUrl}/${courseId}`, { userIds })
  return response.data
}

/**
 * Deletes a course from the server
 * @param id the id of the course to be deleted
 */
const deleteCourse = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

const unenrollUser = async (courseId: string, userId: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${courseId}/students/${userId}`)
}

const getUpcomingExams = async (id: string): Promise<AppEvent[]> => {
  const response = await axios.get(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

export default {
  create,
  getAll,
  getByUser,
  getCourse,
  enrollUser,
  enrollUsers,
  deleteCourse,
  unenrollUser,
  getUpcomingExams
}
