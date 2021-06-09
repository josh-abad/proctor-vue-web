export type Role = 'student' | 'coordinator' | 'admin'

export type AttemptStatus = 'in-progress' | 'completed' | 'expired'

export type ExamWithTaken = Exam & { isTaken: boolean }

export type CourseWithExams = Omit<Course, 'exams'> & { exams: Exam[] }

export interface User {
  id: string
  name: {
    first: string
    last: string
  }
  fullName: string
  recentCourses: string[]
  courses: Course[]
  email: string
  verified: boolean
  avatarUrl: string
  referenceImageUrl?: string
  role: Role
}

export interface AuthenticatedUser extends User {
  token: string
}

export interface UserCredentials {
  name: {
    first: string
    last: string
  }
  email: string
  password: string
}

export interface Course {
  id: string
  name: string
  description: string
  exams: string[]
  coordinator: User
  studentsEnrolled: string[]
  weeks: number
  slug: string
}

export interface NewCourse
  extends Omit<Course, 'id' | 'coordinator' | 'studentsEnrolled' | 'exams'> {
  coordinatorId: string
}

export interface Exam {
  label: string
  examItems: ExamItem[]
  random: boolean
  length: number
  duration: number
  course: Course
  maxAttempts: number
  week: number
  startDate: Date
  endDate: Date
  id: string
  slug: string
}

export interface NewExam extends Omit<Exam, 'id' | 'course' | 'slug'> {
  courseId: string
}

export interface Answer {
  question: string
  answer: string
}

export interface Submission {
  answers: Answer[]
  examId: string
}

export interface Attempt {
  id: string
  exam: Exam
  user: User
  status: AttemptStatus
  startDate: Date
  endDate: Date
  submittedDate: Date
  examResult?: string
  score: number
  examTotal: number
}

export interface ExamItem {
  question: string
  questionType: QuestionType
  answer: string[]
  choices: string[]
}

export type QuestionType = 'multiple choice' | 'text' | 'multiple answers'

export interface Score {
  examItem: string
  points: number
}

export interface ExamResult {
  id: string
  exam: string
  user: User
  scores: Score[]
  attempt: string
}

export interface Link {
  name: string
  url: string
}

export interface Option {
  text: string
  value: string
}

export interface ExamActivity {
  user: {
    name: string
    url: string
    id: string
  }
  exam: {
    name: string
    url: string
  }
  status: string
  course: {
    name: string
    url: string
  }
  date: Date
}

export type Theme = 'dark' | 'light' | 'system'

export interface CourseGrades {
  courseName: string
  courseId: string
  courseSlug: string
  exams: {
    slug: string
    label: string
    id: string
    weight: number
    weightPercentage: string
    grade: number
  }[]
  courseTotal: number
}
