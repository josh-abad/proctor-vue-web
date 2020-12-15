import { Submission } from '@/types'
import axios from 'axios'
const baseUrl = '/api/exam-results'

let token: string | null = null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const submit = async (submission: Submission) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, submission, config)
  return response.data
}

export default { submit, setToken }
