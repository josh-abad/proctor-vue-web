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

export function formatDuration(seconds: number) {
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : ''
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
  return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, '')
}
