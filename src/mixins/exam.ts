import { Exam } from '@/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export default {
  methods: {
    examLocked (exam: Exam): boolean {
      return !dayjs().isBetween(exam.startDate, exam.endDate, null, '[)')
    }
  }
}
