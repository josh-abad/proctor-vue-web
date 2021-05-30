import { User } from '@/types'
import axios from 'axios'
import { API_URL } from './helper'
const baseUrl = `${API_URL}/verify`

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
