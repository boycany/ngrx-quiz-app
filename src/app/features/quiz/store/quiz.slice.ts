import { QUESTIONS } from '../../../data/questions';
import { Question } from '../../../models/question.model';

// Slice means the part of the state
export interface QuizSlice {
  readonly questions: Question[];
  readonly answers: number[];
  readonly isBusy: boolean;
}

export const initialQuizSlice: QuizSlice = {
  questions: QUESTIONS,
  answers: [],
  isBusy: false,
};
