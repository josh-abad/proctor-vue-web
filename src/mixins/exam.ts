import { Exam } from '@/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export default {
  methods: {
    /**
     * Checks if an exam is open.
     * Returns 0 if so, else -1 if it has yet to be opened and 1 if it has already closed.
     * @param exam the exam to check
     */
    examLocked (exam: Exam): number {
      if (dayjs().isBetween(exam.startDate, exam.endDate, null, '[)')) {
        return 0
      } else {
        return dayjs().isAfter(exam.endDate) ? 1 : -1
      }
    }
  }
}
