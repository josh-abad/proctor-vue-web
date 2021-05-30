import { User } from '@/types'
import axios from 'axios'
const baseUrl = '/api/verify'

/**
 * Verifies a user
 * @param token the token containing the user's information
 */
const verify = async (token: string) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const response = await axios.post<User>(baseUrl, {}, config)
  return response.data
}

export default { verify }
