import { UserCredentials } from '@/types'
import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials: Omit<UserCredentials, 'name' | 'role' | 'id'>) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
