import { Answer } from '@/types'
import axios from 'axios'
const baseUrl = '/api/submit-exam'

const submit = async (answers: Answer[]) => {
  const response = await axios.post(baseUrl, answers)
  return response.data
}

export default { submit }
