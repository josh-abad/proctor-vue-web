import { UserCredentials } from '@/types'
import axios from 'axios'
const baseUrl = '/api/users'

const create = async (newUser: UserCredentials) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { create, getAll, getUser }
