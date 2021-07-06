import { Attempt, Exam, User, UserCredentials } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/users`

/**
 * Registers a new user to the server
 * @param newUser the credentials of the new user
 */
const create = async (newUser: UserCredentials) => {
  const response = await axios.post<User>(baseUrl, newUser)
  return response.data
}

const getAttempts = async (id: string, limit = 0) => {
  const response = await axios.get<Attempt[]>(`${baseUrl}/${id}/attempts`, {
    params: { limit }
  })
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

const getOpenExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/open-exams`)
  return response.data
}

const getUpcomingExams = async (id: string) => {
  const response = await axios.get<Exam[]>(`${baseUrl}/${id}/upcoming-exams`)
  return response.data
}

const deleteUser = async (id: string) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  create,
  getAttempts,
  getStudents,
  getUser,
  getCoordinators,
  getOpenExams,
  getUpcomingExams,
  deleteUser
}
