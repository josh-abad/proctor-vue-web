export interface NewUser {
  name: {
    first: string;
    last: string;
  };
  username: string;
  password: string;
}

export interface User {
  name: string;
  username: string;
  courses: string[];
  token: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface Answer {
  questionId: string;
  answer: string;
}

export interface ExamItemContent {
  id: string;
  question: string;
  examType: 'multiple choice' | 'text' | 'multiple answers';
  choices: string[];
  course: Course;
}

export enum QuestionType {
  MultipleChoice, Text, MultipleAnswers
 }

export type State = {
  user: User | null;
  courses: Course[];
  examItems: ExamItemContent[];
  message: string;
}
