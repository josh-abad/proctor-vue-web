import {
  Attempt,
  Course,
  CourseGrades,
  Exam,
  ExamWithAnswers,
  User
} from '@/types'
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

const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await axios.put<User>(
    `${baseUrl}/password`,
    { oldPassword, newPassword },
    config
  )
  return response.data
}

const deactivateAccount = async () => {
  await axios.post(`${baseUrl}/deactivate`, {}, config)
}

const getAttempts = async (limit = 0) => {
  const response = await axios.get<Attempt[]>(`${baseUrl}/attempts`, {
    ...config,
    params: { limit }
  })
  return response.data
}

const getAttemptsByExam = async (examId: string, limit = 0) => {
  const response = await axios.get<Attempt[]>(`${baseUrl}/attempts`, {
    ...config,
    params: { limit, exam: examId }
  })
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

const getExam = async (courseSlug: string, examSlug: string) => {
  const response = await axios.get<ExamWithAnswers>(
    `${baseUrl}/courses/${courseSlug}/exams/${examSlug}`,
    config
  )
  return response.data
}

const getExams = async () => {
  const response = await axios.get<Exam[]>(`${baseUrl}/exams`, config)
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

const getGradesForCourse = async (slug: string) => {
  const response = await axios.get<CourseGrades>(
    `${baseUrl}/grades/${slug}`,
    config
  )
  return response.data
}

const getOpenExams = async () => {
  const response = await axios.get<Exam[]>(`${baseUrl}/open-exams`, config)
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

const resetPassword = async (newPassword: string, token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post<User>(
    `${baseUrl}/reset-password`,
    { newPassword },
    config
  )
  return response.data
}

const sendPasswordResetLink = async (email: string) => {
  await axios.post(`${baseUrl}/forgot-password`, { email })
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
  changePassword,
  deactivateAccount,
  getAttempts,
  getAttemptsByExam,
  getCourses,
  getExam,
  getExams,
  getExamsTaken,
  getGradesForCourse,
  getOpenExams,
  getRecentCourses,
  getUpcomingExams,
  getUser,
  resetPassword,
  sendPasswordResetLink,
  uploadReferenceImage
}
