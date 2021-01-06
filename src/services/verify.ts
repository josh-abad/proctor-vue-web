import { User } from '@/types'
import axios from 'axios'
const baseUrl = '/api/verify'

const verify = async (token: string): Promise<User> => {
  const response = await axios.post(baseUrl, { token })
  return response.data
}

export default { verify }
