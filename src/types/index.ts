export type Role = 'student' | 'coordinator' | 'admin'

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  username: string;
  courses: string[];
  token: string;
  role: Role;
}

export interface UserCredentials extends Omit<User, 'courses' | 'token' | 'id'> {
  password: string;
}

export interface Course {
  id: string;
  name: string;
  coordinator: Omit<User, 'token'>;
}

export interface NewCourse {
  name: string;
  coordinatorId: string;
}

export interface Exam {
  label: string;
  questions: ExamItem[];
  random: boolean;
  length: number;
  duration: number;
  course: Course;
  maxAttempts: number;
  id: string;
}

export interface NewExam extends Omit<Exam, 'id' | 'course' | 'questions'> {
  questionIds: string[];
  courseId: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface Submission {
  answers: Answer[];
  examId: string;
}

export interface Attempt {
  id: string;
  exam: string;
  user: string;
  status: string;
  startDate: Date;
  endDate: Date;
  submittedDate: Date;
  examResult?: string;
  score: number;
  examTotal: number;
}

export interface ExamItem {
  id: string;
  question: string;
  examType: 'multiple choice' | 'text' | 'multiple answers';
  choices: string[];
  course: Course;
}

export interface NewExamItem extends Omit<ExamItem, 'id' | 'course'> {
  courseId: string;
  answer: string;
}

export interface Score {
  examItem: string;
  points: number;
}

export interface ExamResult {
  id: string;
  exam: string;
  user: string;
  scores: Score[];
  attempt: string;
}

export interface DialogContent {
  header: string;
  message: string;
  actionLabel: string;
  closed: boolean;
}

export interface Link {
  name: string;
  url: string;
}

export interface Option {
  text: string;
  value: string;
}

export type Theme = 'dark' | 'light' | null

export type State = {
  user: User | null;
  users: Omit<User, 'token'>[];
  courses: Course[];
  recentCourses: string[];
  maxRecentCourses: number;
  examItems: ExamItem[];
  message: string;
  exams: Exam[];
  attempts: Attempt[];
  examResults: ExamResult[];
  activeExam: string | null;
  dialog: DialogContent;
  theme: Theme;
}
