import { AuthenticatedUser, UserCredentials } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/login`

/**
 * Attempts to log in to the app with the specified credentials
 * @param credentials the email and password of the user
 */
const login = async (credentials: Omit<UserCredentials, 'name'>) => {
  const response = await axios.post<AuthenticatedUser>(baseUrl, credentials)
  return response.data
}

export default { login }
