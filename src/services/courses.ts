import { Course, CourseGrades, Exam, NewCourse, User } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/courses`

/**
 * Creates a new course in the server and returns it
 * @param newCourse the information for the new course
 */
const create = async (newCourse: NewCourse) => {
  const response = await axios.post<Course>(baseUrl, newCourse)
  return response.data
}

/**
 * Gets all courses from the server
 */
const getAll = async () => {
  const response = await axios.get<Course[]>(baseUrl)
  return response.data
}

/**
 * Gets a course from the server by its ID
 * @param id the id of the course
 */
const getCourse = async (id: string) => {
  type CourseWithExams = Omit<Course, 'exams'> & { exams: Exam[] }
  const response = await axios.get<CourseWithExams>(`${baseUrl}/${id}`)
  return response.data
}

/**
 * Gets all courses a specified user is enrolled in
 * @param userId the id of the user
 */
const getByUser = async (userId: string) => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get<Course[]>(baseUrl, { params })
  return response.data
}

/**
 * Adds a user to a course's enrolled students and returns the updated course
 * @param userId the id of the user
 * @param courseId the id of the course
 */
const enrollUser = async (userId: string, courseId: string) => {
  const response = await axios.put<Course>(`${baseUrl}/${courseId}`, { userId })
  return response.data
}

/**
 * Adds multiple users to a course's enrolled students at once and returns the updated course
 * @param userIds an array of each user's id
 * @param courseId the id of the course
 */
const enrollUsers = async (userIds: string[], courseId: string) => {
  const response = await axios.put<Course>(`${baseUrl}/${courseId}`, {
    userIds
  })
  return response.data
}

/**
 * Deletes a course from the server
 * @param id the id of the course to be deleted
 */
const deleteCourse = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const unenrollUser = async (courseId: string, userId: string) => {
  await axios.delete(`${baseUrl}/${courseId}/students/${userId}`)
}

const getAllExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/exams`)
  return response.data
}

const getUpcomingExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

const getStudents = async (id: string) => {
  const response = await axios.get<User[]>(`${baseUrl}/${id}/students`)
  return response.data
}

const getCourseProgressByUser = async (id: string, userId: string) => {
  const response = await axios.get<{ percentage: number }>(
    `${baseUrl}/${id}/progress/${userId}`
  )
  return response.data
}

const getExamsByWeek = async (id: string, week: number) => {
  const response = await axios.get<Exam[]>(
    `${baseUrl}/${id}/exams/week/${week}`
  )
  return response.data
}

const getUserGrades = async (id: string, userId: string) => {
  const response = await axios.get<CourseGrades>(
    `${baseUrl}/${id}/grades/${userId}`
  )
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
  getAllExams,
  getUpcomingExams,
  getStudents,
  getCourseProgressByUser,
  getExamsByWeek,
  getUserGrades
}
