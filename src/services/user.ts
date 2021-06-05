import { AppEvent, Course, CourseGrades, Exam, User } from '@/types'
import axios from 'axios'
import { config } from './auth'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/user`

const addRecentCourse = async (courseId: string) => {
  const response = await axios.put<User>(
    `${baseUrl}/recent-courses`,
    {
      courseId
    },
    config
  )
  return response.data
}

const getCourses = async () => {
  type CourseWithProgress = Course & { progress: number }
  const response = await axios.get<CourseWithProgress[]>(
    `${baseUrl}/courses`,
    config
  )
  return response.data
}

const getExamsTaken = async (id: string) => {
  interface ExamTaken {
    exam: string
    isTaken: boolean
  }
  const response = await axios.get<ExamTaken[]>(
    `${baseUrl}/exams-taken/${id}`,
    config
  )
  return response.data
}

const getGradesForCourse = async (id: string) => {
  const response = await axios.get<CourseGrades>(
    `${baseUrl}/grades/${id}`,
    config
  )
  return response.data
}

const getOpenExams = async () => {
  const response = await axios.get<Exam[]>(`${baseUrl}/open-exams`, config)
  return response.data
}

const getRecentActivity = async () => {
  const response = await axios.get<AppEvent[]>(
    `${baseUrl}/recent-activity`,
    config
  )
  return response.data
}

const getRecentCourses = async (limit = 5) => {
  const response = await axios.get<Course[]>(`${baseUrl}/recent-courses`, {
    ...config,
    params: { limit }
  })
  return response.data
}

const getUpcomingExams = async () => {
  const response = await axios.get<Exam[]>(`${baseUrl}/upcoming-exams`, config)
  return response.data
}

const getUser = async () => {
  const response = await axios.get<User>(baseUrl, config)
  return response.data
}

const uploadReferenceImage = async (data: FormData) => {
  const response = await axios.post<User>(`${baseUrl}/reference-image`, data, {
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export default {
  addRecentCourse,
  getCourses,
  getExamsTaken,
  getGradesForCourse,
  getOpenExams,
  getRecentActivity,
  getRecentCourses,
  getUpcomingExams,
  getUser,
  uploadReferenceImage
}
