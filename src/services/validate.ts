import { backendUrl } from '@/constants'
import { AuthenticatedUser } from '@/types'
import axios from 'axios'
const baseUrl = `${backendUrl}/api/validate`

/**
 * If a session token is found when first opening the app (the user ticked Keep Me Signed In when logging in), check if the token is still valid (i.e., token is expired).
 * If it's still valid, server returns the user with a new token, resetting the time for the token to expire. Else, it returns 401.
 * @param token the user's session token
 */
const validate = async (token: string): Promise<AuthenticatedUser> => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(baseUrl, {}, config)
  return response.data
}

export default { validate }
