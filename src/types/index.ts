export type Role = 'student' | 'coordinator' | 'admin'

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  courses: string[];
  email: string;
  verified: boolean;
  avatarUrl: string;
  role: Role;
}

export interface AuthenticatedUser extends User {
  token: string;
}

export interface UserCredentials extends Omit<User, 'courses' | 'id' | 'role' | 'verified' | 'avatarUrl'> {
  password: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  coordinator: Omit<User, 'token'>;
  studentsEnrolled: string[];
  weeks: number;
}

export interface NewCourse extends Omit<Course, 'id' | 'coordinator' | 'studentsEnrolled'> {
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
  question: string;
  questionType: QuestionType;
  answer: string;
  choices: string[];
}

export type QuestionType = 'multiple choice' | 'text' | 'multpipl answers'

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
  user: AuthenticatedUser | null;
  users: User[];
  courses: Course[];
  recentCourses: string[];
  maxRecentCourses: number;
  message: string;
  exams: Exam[];
  attempts: Attempt[];
  examResults: ExamResult[];
  activeExam: string | null;
  dialog: DialogContent;
  theme: Theme;
}
