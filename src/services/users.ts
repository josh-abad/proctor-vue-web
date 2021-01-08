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

/**
 * If a session token is found when first opening the app (the user ticked Keep Me Signed In when logging in), check if the token is still valid (i.e., token is expired).
 * If it's still valid, server returns the user with a new token, resetting the time for the token to expire. Else, it returns 401.
 * @param id the id of the user
 * @param token the user's session token
 */
const validateUserToken = async (id: string, token: string): Promise<AuthenticatedUser> => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

export default { create, getAll, getUser, validateUserToken }
