import { User } from '@/types'
import axios from 'axios'
import API_URL from './utils/config'
const baseUrl = `${API_URL}/api/verify`

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
