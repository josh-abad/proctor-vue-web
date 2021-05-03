import { Exam } from '@/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export function isExamLocked (exam: Exam): number {
  if (dayjs().isBetween(exam.startDate, exam.endDate, null, '[)')) {
    return 0
  }
  return dayjs().isAfter(exam.endDate) ? 1 : -1
}
