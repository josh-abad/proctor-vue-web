import { backendUrl } from '@/constants'
import { User } from '@/types'
import axios from 'axios'
const baseUrl = `${backendUrl}/api/verify`

/**
 * Verifies a user
 * @param token the token containing the user's information
 */
const verify = async (token: string): Promise<User> => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post(baseUrl, {}, config)
  return response.data
}

export default { verify }
