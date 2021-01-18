import { backendUrl } from '@/constants'
import { AuthenticatedUser, UserCredentials } from '@/types'
import axios from 'axios'
const baseUrl = `${backendUrl}/api/login`

/**
 * Attempts to log in to the app with the specified credentials
 * @param credentials the email and password of the user
 */
const login = async (credentials: Omit<UserCredentials, 'name'>): Promise<AuthenticatedUser> => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
