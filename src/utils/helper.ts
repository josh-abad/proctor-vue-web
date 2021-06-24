import { Exam } from '@/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export function isExamLocked(exam: Exam): number {
  if (exam.startDate && !exam.endDate) {
    return 0
  }
  if (
    exam.startDate &&
    exam.endDate &&
    dayjs().isBetween(exam.startDate, exam.endDate, null, '[)')
  ) {
    return 0
  }
  return exam.endDate && dayjs().isAfter(exam.endDate) ? 1 : -1
}

/**
 * Shuffle an array in-place.
 * Uses Durstenfeld version of the Fisher-Yates shuffle algorithm.
 *
 * @param array this array to shuffle
 * @returns the shuffled array
 */
export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
