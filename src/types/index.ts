export type Role = 'student' | 'coordinator' | 'admin'

export interface User {
  name: {
    first: string;
    last: string;
  };
  username: string;
  courses: string[];
  token: string;
  role: Role;
}

export interface UserCredentials extends Omit<User, 'courses' | 'token'> {
  password: string;
}

export interface Course {
  id: string;
  name: string;
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

export type Theme = 'dark' | 'light' | null

export type State = {
  user: User | null;
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
