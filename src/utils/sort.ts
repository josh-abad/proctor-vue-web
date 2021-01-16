import { AppEvent, Course, User } from '@/types'

export const alphabeticalUsers = (a: User | undefined, b: User | undefined) => {
  if (!a || !b) {
    return 0
  }
  if (a.name.last < b.name.last) {
    return -1
  } else if (a.name.last > b.name.last) {
    return 1
  }
  return 0
}

export const alphabeticalCourses = (a: Course, b: Course) => {
  if (a.name < b.name) {
    return -1
  } else if (a.name > b.name) {
    return 1
  }
  return 0
}

export const eventDate = (a: AppEvent, b: AppEvent) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf()
}
