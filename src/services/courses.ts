import {
  Attempt,
  Course,
  CourseGrades,
  CourseWithExams,
  Exam,
  NewExternalLink,
  NewCourse,
  User
} from '@/types'
import axios from 'axios'
import { config } from './auth'
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
 * Gets a course from the server by its slug
 * @param slug the slug of the course
 */
const getCourse = async (slug: string) => {
  const response = await axios.get<CourseWithExams>(
    `${baseUrl}/${slug}`,
    config
  )
  return response.data
}

/**
 * Adds multiple users to a course's enrolled students at once and returns the updated course
 * @param userIds an array of each user's id
 * @param courseId the id of the course
 */
const enrollUsers = async (userIds: string[], courseId: string) => {
  const response = await axios.put<Course>(
    `${baseUrl}/${courseId}`,
    {
      userIds
    },
    config
  )
  return response.data
}

/**
 * Deletes a course from the server
 * @param slug the slug of the course to be deleted
 */
const deleteCourse = async (slug: string) => {
  await axios.delete(`${baseUrl}/${slug}`, config)
}

const unenrollUser = async (slug: string, userId: string) => {
  await axios.delete(`${baseUrl}/${slug}/students/${userId}`)
}

const getExam = async (courseSlug: string, examSlug: string) => {
  const response = await axios.get<Exam>(
    `${baseUrl}/${courseSlug}/exams/${examSlug}`
  )
  return response.data
}

const getUpcomingExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

const getStudents = async (slug: string) => {
  const response = await axios.get<User[]>(
    `${baseUrl}/${slug}/students`,
    config
  )
  return response.data
}

const getCourseProgressByUser = async (slug: string, userId: string) => {
  const response = await axios.get<{ percentage: number }>(
    `${baseUrl}/${slug}/progress/${userId}`
  )
  return response.data
}

const getUserGrades = async (slug: string, userId: string) => {
  const response = await axios.get<CourseGrades>(
    `${baseUrl}/${slug}/grades/${userId}`,
    config
  )
  return response.data
}

const addExternalLink = async (id: string, externalLink: NewExternalLink) => {
  const response = await axios.put<Course>(
    `${baseUrl}/${id}/external-links`,
    externalLink,
    config
  )
  return response.data
}

const deleteExternalLink = async (id: string, externalLinkId: string) => {
  await axios.delete(
    `${baseUrl}/${id}/external-links/${externalLinkId}`,
    config
  )
}

const getAttemptsInCourse = async (id: string) => {
  const response = await axios.get<Attempt[]>(
    `${baseUrl}/${id}/attempts`,
    config
  )
  return response.data
}

export default {
  create,
  getCourse,
  enrollUsers,
  deleteCourse,
  unenrollUser,
  getExam,
  getUpcomingExams,
  getStudents,
  getCourseProgressByUser,
  getUserGrades,
  addExternalLink,
  deleteExternalLink,
  getAttemptsInCourse
}
