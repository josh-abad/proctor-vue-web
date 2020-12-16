export interface User {
  name: string;
  username: string;
  courses: string[];
  token: string;
}

export interface UserCredentials {
  name: {
    first: string;
    last: string;
  };
  username: string;
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
  examResult?: string;
}

export interface ExamItem {
  id: string;
  question: string;
  examType: 'multiple choice' | 'text' | 'multiple answers';
  choices: string[];
  course: Course;
}

export interface ExamResult {
  exam: string;
  user: string;
  scores: Map<string, number>;
  attempt: string;
}

export type State = {
  user: User | null;
  courses: Course[];
  examItems: ExamItem[];
  message: string;
  exams: Exam[];
  attempts: Attempt[];
  examResults: ExamResult[];
  activeExam: string | null;
}
