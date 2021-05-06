export type Role = 'student' | 'coordinator' | 'admin'

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  fullName: string;
  recentCourses: string[];
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

export type Theme = 'dark' | 'light' | 'system'

export interface CourseGrades {
  courseName: string;
  courseId: string;
  exams: {
    label: string;
    id: string;
    weight: number;
    weightPercentage: string;
    grade: number;
  }[];
  courseTotal: number;
}
