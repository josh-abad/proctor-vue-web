import { AuthenticatedUser, User, UserCredentials } from '@/types'
import axios from 'axios'
const baseUrl = '/api/users'

/**
 * Registers a new user to the server
 * @param newUser the credentials of the new user
 */
const create = async (newUser: UserCredentials): Promise<AuthenticatedUser> => {
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

export default { create, getAll, getUser }
