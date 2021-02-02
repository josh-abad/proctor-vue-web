export type Role = 'student' | 'coordinator' | 'admin'

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  fullName: string;
  courses: string[];
  email: string;
  verified: boolean;
  avatarUrl: string;
  referenceImageUrl?: string;
  role: Role;
}

export interface AuthenticatedUser extends User {
  token: string;
}

export interface UserCredentials {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  exams: string[];
  coordinator: Omit<User, 'token'>;
  studentsEnrolled: string[];
  weeks: number;
}

export interface NewCourse extends Omit<Course, 'id' | 'coordinator' | 'studentsEnrolled' | 'exams'> {
  coordinatorId: string;
}

export interface Exam {
  label: string;
  examItems: ExamItem[];
  random: boolean;
  length: number;
  duration: number;
  course: Course;
  maxAttempts: number;
  week: number;
  startDate: Date;
  endDate: Date;
  id: string;
}

export interface NewExam extends Omit<Exam, 'id' | 'course'> {
  courseId: string;
}

export interface Answer {
  question: string;
  answer: string;
}

export interface Submission {
  answers: Answer[];
  examId: string;
  submittedDate?: Date;
}

export interface Attempt {
  id: string;
  exam: Exam;
  user: string;
  status: 'in-progress' | 'completed';
  startDate: Date;
  endDate: Date;
  submittedDate: Date;
  examResult?: string;
  score: number;
  examTotal: number;
}

export interface ExamItem {
  question: string;
  questionType: QuestionType;
  answer: string[];
  choices: string[];
}

export type QuestionType = 'multiple choice' | 'text' | 'multiple answers'

export interface Score {
  examItem: string;
  points: number;
}

export interface ExamResult {
  id: string;
  exam: string;
  user: User;
  scores: Score[];
  attempt: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface Option {
  text: string;
  value: string;
}

export interface AppEvent {
  subject: string;
  subjectUrl: string;
  subjectId: string;
  predicate?: string;
  predicateUrl?: string;
  action: string;
  location: string;
  locationUrl: string;
  date: Date;
}

export type RootState = {
  user: AuthenticatedUser | null;
}

export type UsersState = {
  users: User[];
}

export type CoursesState = {
  courses: Course[];
  recentCourses: string[];
}

export type ExamsState = {
  exams: Exam[];
  attempts: Attempt[];
  examResults: ExamResult[];
  activeExam: string | null;
}

export type AlertState = {
  message: string;
}

export class WebcamTimer {
  private _start: number
  private _remaining: number
  private _status: 'active' | 'stopped' | 'paused'
  private timerId: number | null
  private callback: () => void
  private duration: number

  constructor (callback: () => void, duration: number, start = false) {
    this._remaining = duration
    this.callback = callback
    this.duration = duration
    this._start = start ? Date.now() : 0
    this.timerId = start ? window.setTimeout(this.callback, duration) : null
    this._status = start ? 'active' : 'stopped'
  }

  start (): void {
    this.timerId && clearTimeout(this.timerId)
    this._start = Date.now()
    this.timerId = window.setTimeout(this.callback, this.duration)
    this._status = 'active'
  }

  stop (): void {
    if (this._status === 'active') {
      this.timerId && clearTimeout(this.timerId)
      this._remaining = 0
      this._status = 'stopped'
    }
  }

  pause (): void {
    if (this._status === 'active') {
      this.timerId && clearTimeout(this.timerId)
      this._remaining = this.duration - (Date.now() - this._start)
      this._status = 'paused'
    }
  }

  resume (): void {
    if (this._status === 'paused') {
      this.timerId && clearTimeout(this.timerId)
      this._start = Date.now()
      this.timerId = window.setTimeout(this.callback, this._remaining)
      this._status = 'active'
    }
  }

  get remaining (): number {
    if (this._status === 'paused') {
      return Math.floor(this._remaining / 1000)
    } else if (this._status === 'active') {
      return Math.floor((this.duration - (Date.now() - this._start)) / 1000)
    }
    return 0
  }

  get status (): 'active' | 'paused' | 'stopped' {
    return this._status
  }
}
