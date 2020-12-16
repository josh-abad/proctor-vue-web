import { Submission } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exam-results'

let token: string | null = null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const hasToken = (): boolean => !!token

const submit = async (submission: Submission) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, submission, config)
  return response.data
}

const getByUser = async (userId: string) => {
  const params = new URLSearchParams({ userId })
  const response = await axios.get(baseUrl, { params })
  return response.data
}

export default { submit, setToken, getByUser, hasToken }
